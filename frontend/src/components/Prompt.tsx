import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { formInfo } from "../types/formInfo";
import { FiSend } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const Prompt = () => {
    const navigate = useNavigate();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (info: formInfo) => {
            const { data } = await axios.post('http://localhost:5000/generate', info);
            return data;
        },
        onSuccess: (data) => {
            toast.success("Cover letters generated successfully!");

            navigate('/templates', { state: { coverLetters: data.coverLetters } });
        },
        onError: () => {
            toast.error("Failed to generate cover letters. Please try again.");
        }
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const jobDesc = (form.jobDesc as HTMLTextAreaElement).value;
        const resume = (form.resume as HTMLTextAreaElement).value;

        try {
            await mutateAsync({ jobDesc, resume });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Cover Letter Generator</h1>
                    <p className="text-gray-600">Create personalized cover letters in seconds</p>
                </div>

                <div className="space-y-6">
                    <div className="relative">
                        <label htmlFor="jobDesc" className="block text-sm font-medium text-gray-700 mb-2">
                            Job Description
                        </label>
                        <textarea
                            id="jobDesc"
                            name="jobDesc"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Paste the job description here..."
                            rows={6}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                            Your Resume Content
                        </label>
                        <textarea
                            id="resume"
                            name="resume"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Paste your resume content here..."
                            rows={6}
                            required
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isPending}
                        className={`w-full cursor-pointer py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition flex items-center justify-center space-x-2 ${isPending ? "opacity-75 cursor-not-allowed" : ""
                            }`}
                    >
                        {isPending ? (
                            <>
                                <ImSpinner8 className="animate-spin" />
                                <span>Generating...</span>
                            </>
                        ) : (
                            <>
                                <FiSend />
                                <span>Generate</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Prompt;