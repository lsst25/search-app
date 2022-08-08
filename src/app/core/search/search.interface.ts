export interface BaseResponse {
    error?: string;
    search_information: SearchInformation;
}

export interface SearchResult {
    title: string;
    snippet: string;
    displayed_link: string;
    link: string;
    about_page_link: string;
}

export interface SearchResponse extends BaseResponse{
    organic_results: SearchResult[];
}

export interface SearchInformation {
    total_results: number;
}

export interface NewsSearchResponse extends BaseResponse {
    news_results: NewsResult[];
}

export interface NewsResult {
    date: string;
    link: string;
    position: number;
    snippet: string;
    source: string;
    thumbnail: string;
    title: string;
}
