import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import {
  NewsSearchResponse,
  SearchModeParam,
  SearchParamsObject,
  SearchResponse,
} from './search.interface'

@Injectable({
  providedIn: 'root',
})
export class SearchHttpService {
  private readonly NEWS_MODE_PARAM_VALUE: SearchModeParam = 'nws'
  private readonly ENDPOINT: string = '/search.json'

  constructor(private http: HttpClient) {}

  public search(
    searchValue: string,
    itemsOffset: number,
    itemsNumber: number
  ): Observable<SearchResponse> {
    const paramsObj: SearchParamsObject = {
      q: searchValue,
      start: itemsOffset,
      num: itemsNumber,
    }

    const params = new HttpParams({ fromObject: paramsObj } as any)
    return this.http.get<SearchResponse>(this.ENDPOINT, { params })
  }

  public searchNews(
    searchValue: string,
    itemsOffset: number,
    itemsNumber: number
  ): Observable<NewsSearchResponse> {
    const paramsObj: SearchParamsObject = {
      q: searchValue,
      start: itemsOffset,
      num: itemsNumber,
      tbm: this.NEWS_MODE_PARAM_VALUE,
    }

    const params = new HttpParams({ fromObject: paramsObj } as any)
    return this.http.get<NewsSearchResponse>(this.ENDPOINT, { params })
  }
}
