import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsComponent} from './news.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {SearchService} from "../core/search/search.service";
import {SearchServiceMock} from "../mocks/search-service-mock";

describe('NewsComponent', () => {
    let component: NewsComponent;
    let fixture: ComponentFixture<NewsComponent>;
    let searchService: SearchService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NewsComponent],
            imports: [ReactiveFormsModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {
                    provide: SearchService,
                    useClass: SearchServiceMock
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NewsComponent);
        component = fixture.componentInstance;
        searchService = TestBed.inject(SearchService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call initLatestNews of Search Service on init', () => {
        const spy = spyOn(searchService, 'initLatestNews');
        component.ngOnInit();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call loadLatestNews of Search Service in onScroll', () => {
        const spy = spyOn(searchService, 'loadLatestNews');
        component.onScroll();

        expect(spy).toHaveBeenCalledTimes(1);
    });
});
