import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchPage from "./components/SearchPage";
import DetailPage from "./components/DetailPage";

const App: React.FC = () => (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,0,255,0.15),_transparent_60%),_radial-gradient(circle_at_bottom_right,_rgba(0,150,255,0.15),_transparent_60%)]"></div>
        <Navbar />
        <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
            <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/anime/:id" element={<DetailPage />} />
            </Routes>
        </main>
    </div>
);

export default App;
