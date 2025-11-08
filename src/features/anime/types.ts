export interface Anime {
    mal_id: number;
    title: string;
    images?: { jpg?: { image_url?: string } };
    synopsis?: string | null;
    type?: string;
    episodes?: number | null;
    score?: number | null;
    year?: number | null;
}

export interface Pagination {
    last_visible_page?: number;
    current_page?: number;
    has_next_page?: boolean;
}

export interface AnimeSearchResponse {
    data?: Anime[];
    pagination?: Pagination;
}

export interface AnimeDetailResponse {
    data?: Anime;
}
