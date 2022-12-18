import {
  SearchResult,
  NewsResult,
  SearchResponse,
  NewsSearchResponse,
} from '../core/search/search.interface'

export const SEARCH_RESULTS: SearchResult[] = [
  {
    title: 'test',
    snippet: 'test',
    displayed_link: 'test',
    link: 'test',
  },
  {
    title: 'test',
    snippet: 'test',
    displayed_link: 'test',
    link: 'test',
  },
]

export const NEWS_RESULTS: NewsResult[] = [
  {
    title: 'test',
    snippet: 'test',
    date: 'test',
    link: 'test',
    thumbnail: 'test',
  },
  {
    title: 'test',
    snippet: 'test',
    date: 'test',
    link: 'test',
    thumbnail: 'test',
  },
]

export const SEARCH_RESPONSE: SearchResponse = {
  search_information: { total_results: 300 },
  organic_results: SEARCH_RESULTS,
}

export const NEWS_RESPONSE: NewsSearchResponse = {
  search_information: { total_results: 300 },
  news_results: NEWS_RESULTS,
}
