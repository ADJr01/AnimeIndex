import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
    <nav className="sticky top-0 z-20 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-[0_0_15px_rgba(255,0,255,0.15)]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            <Link
                to="/"
                className="text-3xl font-poppins font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-float"
            >
                Anime Index
            </Link>
        </div>
    </nav>
);


export default Navbar;
