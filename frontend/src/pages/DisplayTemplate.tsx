import { useLocation, useNavigate } from "react-router-dom";
import { CoverLetter } from "../types/coverLetter";
import { useState } from "react";
import toast from "react-hot-toast";

const DisplayTemplates = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const coverLetters = location.state?.coverLetters as CoverLetter[] || [];
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    const parseTemplate = (templateString: string) => {
        try {
            const parsed = JSON.parse(templateString);
            return parsed.template || templateString;
        } catch {
            return templateString;
        }
    };

    if (!coverLetters || coverLetters.length === 0) {
        return (
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">No templates generated</h2>
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Go Back to Generator
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Select a Template</h1>
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
                >
                    Generate New Templates
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {coverLetters.map((letter, index) => {
                    const templateContent = parseTemplate(letter.template);
                    const preview = templateContent.split('\n').slice(0, 5).join('\n') + "...";

                    return (
                        <div
                            key={index}
                            onClick={() => setSelectedTemplate(templateContent)}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedTemplate === templateContent
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-300 hover:border-blue-300"
                                }`}
                        >
                            <h3 className="font-medium text-blue-700 mb-2">Template {index + 1}</h3>
                            <pre className="text-sm text-gray-600 whitespace-pre-wrap">{preview}</pre>
                        </div>
                    );
                })}
            </div>

            {selectedTemplate && (
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Selected Cover Letter</h2>
                    <div className="bg-white p-6 rounded-md border border-gray-200">
                        <div className="whitespace-pre-line text-gray-800">
                            {selectedTemplate.split('\n').map((line, i) => (
                                <p key={i} className="mb-2">
                                    {line.trim() === '' ? <br /> : line}
                                </p>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(selectedTemplate);
                                    toast.success("Copied to clipboard!");
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                            >
                                Copy to Clipboard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisplayTemplates;