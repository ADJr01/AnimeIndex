import { AnimeSearchResponse, AnimeDetailResponse } from "../features/anime/types";

const BASE_URL = "https://api.jikan.moe/v4";

export const searchAnime = async (
    query: string,
    page = 1,
    limit = 12,
    signal?: AbortSignal
): Promise<AnimeSearchResponse> => {
    const url = `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`;
    const res = await fetch(url, { signal });

    if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const data = await res.json();
    if (!data || !data.data) throw new Error("Invalid API response");
    return data;
};

export const getAnimeById = async (id: string, signal?: AbortSignal): Promise<AnimeDetailResponse> => {
    const res = await fetch(`${BASE_URL}/anime/${id}/full`, { signal });
    if (!res.ok) {
        throw new Error(`Failed to fetch anime: ${res.statusText}`);
    }
    return res.json();
};
