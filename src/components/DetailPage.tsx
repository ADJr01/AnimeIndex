import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAnimeDetails } from "../features/anime/animeSlice";

const DetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { selected, loading, error } = useAppSelector((s) => s.anime);

    useEffect(() => {
        if (id) dispatch(fetchAnimeDetails(id));
    }, [id, dispatch]);

    if (loading)
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-pink-500"></div>
            </div>
        );

    if (error) return <p className="text-center text-red-400">{error}</p>;
    if (!selected) return <p className="text-center text-gray-400">No anime found.</p>;

    return (
        <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
            <img
                src={selected.images?.jpg?.image_url}
                alt={selected.title}
                className="w-80 rounded-xl shadow-lg hover:shadow-pink-500/40 transition"
            />
            <div>
                <h2 className="text-3xl font-bold text-pink-400">{selected.title}</h2>
                <p className="text-gray-300 mt-3 max-w-2xl">{selected.synopsis}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                    <span className="bg-purple-700 px-3 py-1 rounded-full text-sm">Type: {selected.type}</span>
                    <span className="bg-indigo-700 px-3 py-1 rounded-full text-sm">Episodes: {selected.episodes}</span>
                    <span className="bg-pink-700 px-3 py-1 rounded-full text-sm">Score: {selected.score ?? "N/A"}</span>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;
