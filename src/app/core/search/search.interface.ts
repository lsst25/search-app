export interface SearchResult {
    title: string;
    snippet: string;
    displayed_link: string;
    link: string;
    about_page_link: string;
}

export interface SearchResponse {
    organic_results: SearchResult[];
    error?: string;
    search_information: SearchInformation;
}

export interface SearchInformation {
    total_results: number;
}
