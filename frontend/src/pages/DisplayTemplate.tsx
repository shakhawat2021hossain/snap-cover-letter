import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import { CoverLetter } from "../types/CoverLetter";

const DisplayTemplates = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const letterRef = useRef<HTMLTextAreaElement>(null);
    
    const coverLetters = (state?.coverLetters as CoverLetter[]) || [];
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [editableLetter, setEditableLetter] = useState("");


    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const lines = doc.splitTextToSize(editableLetter || "", 180);
        doc.text(lines, 10, 10);
        doc.save("cover-letter.pdf");
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(editableLetter);
        toast.success("Copied to clipboard!");
    };

    const handleTemplateSelect = (templateContent: string) => {
        setSelectedTemplate(templateContent);
        setEditableLetter(templateContent);
    };


    if (coverLetters.length === 0) {
        return (
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    No templates generated
                </h2>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Go Back to Generator
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">+

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Select a Template</h1>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
                >
                    Generate New Templates
                </button>
            </div>

    

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {coverLetters.map((letter, index) => {
                    // console.log(letter.template);
                    
                    const templateContent = letter.template
                    const preview = templateContent.split("\n").slice(0, 5).join("\n") + "...";

                    return (
                        <div
                            key={index}
                            onClick={() => handleTemplateSelect(templateContent)}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                selectedTemplate === templateContent
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-300 hover:border-blue-300"
                            }`}
                        >
                            <h3 className="font-medium text-blue-700 mb-2">
                                Template {index + 1}
                            </h3>
                            <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                                {preview}
                            </pre>
                        </div>
                    );
                })}
            </div>


            {selectedTemplate && (
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Edit and Finalize Your Cover Letter
                    </h2>
                    <textarea
                        ref={letterRef}
                        className="w-full h-96 p-4 border border-gray-300 rounded-md text-gray-800 text-sm whitespace-pre-wrap"
                        value={editableLetter}
                        onChange={(e) => setEditableLetter(e.target.value)}
                    />
                    <div className="mt-4 flex flex-wrap justify-end gap-3">
                        <button
                            onClick={handleCopyToClipboard}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Copy to Clipboard
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            className="px-4 py-2 bg-green-600 text-white rounded-md"
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisplayTemplates;