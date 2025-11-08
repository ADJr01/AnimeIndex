import React from "react";
import { Link } from "react-router-dom";
import { Anime } from "../features/anime/types";

const AnimeCard: React.FC<{ anime: Anime }> = ({ anime }) => {
    const img =
        anime.images?.jpg?.image_url ||
        "https://via.placeholder.com/300x400?text=No+Image";

    return (
        <Link
            to={`/anime/${anime.mal_id}`}
            className="relative group overflow-hidden rounded-2xl backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/10 hover:border-purple-400/50 shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(138,43,226,0.4)] transition-all duration-300 transform hover:-translate-y-1"
        >
            <img
                src={img}
                alt={anime.title}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>
            <div className="absolute bottom-0 p-4">
                <h3 className="font-semibold text-lg text-white drop-shadow-md group-hover:text-purple-300 transition">
                    {anime.title}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-2">{anime.synopsis}</p>
            </div>
            <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-1 text-xs rounded-full shadow-lg">
                ⭐ {anime.score ?? "?"}
            </div>
        </Link>
    );
};


export default AnimeCard;
