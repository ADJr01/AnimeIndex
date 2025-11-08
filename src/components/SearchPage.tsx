import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAnime, setQuery, setPage } from "../features/anime/animeSlice";
import useDebounce from "../hooks/useDebounce";
import AnimeCard from "./AnimeCard";
import PaginationButtons from "./PaginationButtons";

const SearchPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { list, loading, page, pagination, query, error } = useAppSelector((s) => s.anime);
    const [input, setInput] = useState(query);
    const debounced = useDebounce(input, 250);

    useEffect(() => {
        dispatch(setQuery(debounced));
    }, [debounced, dispatch]);

    useEffect(() => {
        if (debounced.trim()) {
            dispatch(fetchAnime({ query: debounced, page }));
        }
    }, [debounced, page, dispatch]);

    return (
        <div className="flex flex-col items-center space-y-8 animate-fadeIn">
            {/* Glass search bar */}
            <div className="w-full max-w-2xl">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search your favorite Anime..."
                    className="w-full px-6 py-4 text-lg text-white bg-white/10 rounded-full border border-white/20 focus:outline-none focus:ring-4 focus:ring-purple-500/60 backdrop-blur-md shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all placeholder-gray-300"
                />
            </div>

            {/* Results */}
            {loading && (
                <div className="flex justify-center mt-10">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
                </div>
            )}

            {error && (
                <p className="text-center text-red-400 mt-2 text-sm">{error}</p>
            )}

            {!loading && !error && list.length > 0 && input.length > 0 && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {list.map((anime) => (
                            <AnimeCard key={anime.mal_id} anime={anime} />
                        ))}
                    </div>

                    <PaginationButtons
                        currentPage={pagination?.current_page ?? page}
                        lastPage={pagination?.last_visible_page ?? 1}
                        onChange={(p) => dispatch(setPage(p))}
                    />
                </>
            )}


            {!loading && !error && list.length === 0 && input.length > 0 && (
                <p className="text-gray-300 text-sm">No anime found. Try another search!</p>
            )}
        </div>

    );
};

export default SearchPage;
