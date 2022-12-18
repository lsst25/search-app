import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NO_ERRORS_SCHEMA } from '@angular/core'
import { NEWS_RESULTS } from '../mocks/mock-consts'
import { ReactiveFormsModule } from '@angular/forms'
import { SearchServiceMock } from '../mocks/search-service-mock'
import { SearchHttpService } from '../core/search/search-http.service'
import { NewsComponent } from './news.component'

const PAGINATION_STEP: number = 20

describe('NewsComponent', () => {
  let component: NewsComponent
  let fixture: ComponentFixture<NewsComponent>
  let searchService: SearchHttpService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsComponent],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: SearchHttpService,
          useClass: SearchServiceMock,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(NewsComponent)
    component = fixture.componentInstance
    searchService = TestBed.inject(SearchHttpService)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call search method of SearchHttpService on init', () => {
    const spy = spyOn(searchService, 'searchNews').and.callThrough()
    component.ngOnInit()

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should call search method of SearchHttpService after calling loadLatestNews', () => {
    const spy = spyOn(searchService, 'searchNews').and.callThrough()
    component.loadLatestNews()

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should call resetNews method after init', () => {
    const spy = spyOn<any>(component, 'resetNews').and.callThrough()
    component.ngOnInit()

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should increment pagination', () => {
    expect(component['paginationOffset']).toBe(PAGINATION_STEP)
  })

  it('should increment pagination when loading pagination', () => {
    component.loadLatestNews()

    expect(component['paginationOffset']).toBe(PAGINATION_STEP * 2)
  })

  it('should get NewsResults from NewsResponse and provide it to local property newsResults array', () => {
    expect(component.newsResults).toEqual(NEWS_RESULTS)
  })

  it('should add new results to newsResults array when loading pagination', () => {
    component.loadLatestNews()

    expect(component.newsResults).toEqual([...NEWS_RESULTS, ...NEWS_RESULTS])
  })
})
