import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsComponent} from './news.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {SearchServiceMock} from "../mocks/search-service-mock";
import {SearchHttpService} from "../core/search/search-http.service";

describe('NewsComponent', () => {
    let component: NewsComponent;
    let fixture: ComponentFixture<NewsComponent>;
    let searchService: SearchHttpService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NewsComponent],
            imports: [ReactiveFormsModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {
                    provide: SearchHttpService,
                    useClass: SearchServiceMock
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NewsComponent);
        component = fixture.componentInstance;
        searchService = TestBed.inject(SearchHttpService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call search method of Search Service on init', () => {
        const spy = spyOn(searchService, 'search');
        component.ngOnInit();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call search method of Search Service after calling loadLatestNews', () => {
        const spy = spyOn(searchService, 'search');
        component.loadLatestNews()

        expect(spy).toHaveBeenCalledTimes(1);
    });
});
