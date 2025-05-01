import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-gray-50 mt-12">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
                            CoverGenius
                        </h3>
                        <p className="mt-4 text-sm text-gray-500">
                            AI-powered cover letter generator to help you land your dream job.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
                            Quick Links
                        </h3>
                        <div className="mt-4 space-y-2">
                            <a
                                href="#"
                                className="text-sm text-gray-600 hover:text-blue-600 block"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-sm text-gray-600 hover:text-blue-600 block"
                            >
                                Terms of Service
                            </a>
                            <a
                                href="#"
                                className="text-sm text-gray-600 hover:text-blue-600 block"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
                            Connect
                        </h3>
                        <div className="mt-4 flex space-x-6">
                            
                            <a href="#" className="text-gray-500 hover:text-blue-600">
                                <span className="sr-only">GitHub</span>
                               <FaGithub/>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-600">
                                <span className="sr-only">Facebook</span>
                               <FaFacebook/>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-600">
                                <span className="sr-only">LinkedIn</span>
                               <FaLinkedin/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500 text-center">
                        &copy; {new Date().getFullYear()} CoverGenius. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;