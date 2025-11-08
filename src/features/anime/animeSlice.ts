import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchAnime, getAnimeById } from "../../api/jikan";
import { Anime, Pagination } from "./types";

type AnimeState = {
    list: Anime[];
    loading: boolean;
    error: string | null;
    query: string;
    page: number;
    pagination?: Pagination;
    selected?: Anime | null;
};

const initialState: AnimeState = {
    list: [],
    loading: false,
    error: null,
    query: "",
    page: 1,
    pagination: undefined,
    selected: null,
};

let searchAbortController: AbortController | null = null;

export const fetchAnime = createAsyncThunk(
    "anime/fetchAnime",
    async ({ query, page }: { query: string; page: number }, { signal }) => {
        // Use the provided AbortSignal from createAsyncThunk instead of a shared global one
        const controller = new AbortController();

        // Connect thunk’s signal to our local controller (for safety)
        signal.addEventListener("abort", () => controller.abort());

        const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&page=${page}&limit=12`;

        const res = await fetch(url, { signal: controller.signal });

        if (res.status === 429) throw new Error("Rate limit reached. Try again in a moment.");
        if (!res.ok) throw new Error(`Network error: ${res.statusText}`);

        const data = await res.json();

        if (!data?.data) throw new Error("Invalid response from Jikan API.");

        return data;
    }
);
export const fetchAnimeDetails = createAsyncThunk("anime/fetchAnimeDetails", async (id: string) => {
    const controller = new AbortController();
    const data = await getAnimeById(id, controller.signal);
    return data;
});

const animeSlice = createSlice({
    name: "anime",
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
            state.page = 1;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnime.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAnime.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.data || [];
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchAnime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong.";
            })
            .addCase(fetchAnimeDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selected = null;
            })
            .addCase(fetchAnimeDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selected = action.payload.data || null;
            })
            .addCase(fetchAnimeDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch details.";
            });
    },
});

export const { setQuery, setPage } = animeSlice.actions;
export default animeSlice.reducer;
