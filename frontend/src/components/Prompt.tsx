
const Prompt = () => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

       
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Cover Letter Generator</h1>
                    <p className="text-gray-600">Create personalized cover letters in seconds</p>
                </div>

               

                <div>
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

                <div className="pt-2">
                    <button
                        type="submit"
                        className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition`}
                    >
                        Generate
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Prompt;