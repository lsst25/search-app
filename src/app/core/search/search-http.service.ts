import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {NewsSearchResponse, SearchParamsObject, SearchResponse} from "./search.interface";

@Injectable({
    providedIn: 'root'
})
export class SearchHttpService {

    constructor(private http: HttpClient) {
    }

    public search(
        searchValue: string,
        items: number,
        itemsNumber: number,
        mode?: string): Observable<SearchResponse | NewsSearchResponse> {

        const paramsObj: SearchParamsObject = {
            q: searchValue,
            start: items,
            num: itemsNumber,
        };

        if (mode === 'news') {
            paramsObj.tbm = 'nws';
        }

        const params = new HttpParams({fromObject: paramsObj} as any);
        return this.http.get<SearchResponse>('/search.json', {params});
    }
}
