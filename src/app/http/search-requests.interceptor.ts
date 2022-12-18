import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable()
export class SearchRequestsInterceptor implements HttpInterceptor {
  private apiUrl = environment.SEARCH_API_URL
  private apiKey = environment.SEARCH_API_KEY

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.indexOf('search')) {
      return next.handle(request)
    }

    const updatedRequest: HttpRequest<unknown> = request.clone({
      url: this.apiUrl + request.url,
      setParams: {
        engine: 'google',
        api_key: this.apiKey,
      },
    })

    return next.handle(updatedRequest)
  }
}
