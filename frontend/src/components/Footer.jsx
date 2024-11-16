import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Footer() {
    const user = useSelector((state) => state.auth.user);

    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div>
                    <h3 className="text-2xl font-bold">SAND - Online Video Streaming Platform</h3>
                    <p className="text-sm">Your go-to platform for online video streaming</p>
                    <p className="text-sm">&copy; 2024 SAND | All rights reserved</p>
                </div>
                <div className="flex space-x-4">
                    <Link to="/" className="hover:underline hover:text-red-500">Home</Link>
                    <Link to="/about" className="hover:underline hover:text-red-500">About</Link>
                    <Link to="/contact" className="hover:underline hover:text-red-500">Contact</Link>
                    {!user ? (
                        <Link to="/login" className="hover:underline hover:text-red-500">Login</Link>
                    ) : (
                        <Link to="/profile" className="hover:underline hover:text-red-500">Profile</Link>
                    )}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
