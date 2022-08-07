import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {SearchResponse, SearchResult} from "./search.interface";

@Injectable({
    providedIn: 'root'
})
export class SearchService {


    constructor(private http: HttpClient) {}

    public getSearchResults(searchValue: string, items: number): Observable<SearchResult[]> {
        const params = new HttpParams({
            fromObject: {q: searchValue, start: items}
        })

        return this.http.get<SearchResponse>('/search.json', {params})
            .pipe(
                map(response => response.organic_results)
            );
    }
}
