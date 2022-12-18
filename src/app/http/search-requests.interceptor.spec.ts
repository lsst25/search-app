import { TestBed } from '@angular/core/testing'

import { SearchRequestsInterceptor } from './search-requests.interceptor'

describe('SearchRequestsInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [SearchRequestsInterceptor],
    })
  )

  it('should be created', () => {
    const interceptor: SearchRequestsInterceptor = TestBed.inject(
      SearchRequestsInterceptor
    )
    expect(interceptor).toBeTruthy()
  })
})
