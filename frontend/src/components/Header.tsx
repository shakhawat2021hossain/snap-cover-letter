import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <NavLink to="/" className="text-xl font-bold text-blue-600">
                            SnapCoverLetter
                        </NavLink>
                    </div>
                    <nav className="hidden md:ml-6 md:flex space-x-8">
                        <NavLink
                            to="/generator"
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Generator
                        </NavLink>
                        <NavLink
                            to={'/about'}
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            About
                        </NavLink>
                        <NavLink
                            to={'/contact'}
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Contact
                        </NavLink>
                    </nav>
                    <button className="md:hidden text-gray-500">
                        <GiHamburgerMenu />
                        
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;