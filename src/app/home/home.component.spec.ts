import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {SearchServiceMock} from "../mocks/search-service-mock";
import {By} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {SearchHttpService} from "../core/search/search-http.service";
import {NEWS_RESULTS, SEARCH_RESULTS} from "../mocks/mock-consts";

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let searchService: SearchHttpService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomeComponent],
            imports: [ReactiveFormsModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {
                    provide: SearchHttpService,
                    useClass: SearchServiceMock
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        searchService = TestBed.inject(SearchHttpService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call search method on SearchHttpService on submit with input value',
        () => {
            const spy = spyOn(searchService, 'search').and.callThrough();

            component.searchForm.setValue({
                searchInput: 'test-value'
            });
            component.onSubmit();

            expect(spy).toHaveBeenCalledOnceWith('test-value', 0, 20);
        }
    );

    it('should set currentSearchValue to the input value after form submit',() => {
        component.searchForm.setValue({
            searchInput: 'test-value'
        });
        component.onSubmit();

        expect(component['currentSearchValue']).toBe('test-value');
    });

    it('should call resetSearch method after form submit',() => {
        const spy = spyOn<any>(component, 'resetSearch');

        component.searchForm.setValue({
            searchInput: 'test-value'
        });
        component.onSubmit();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not call search method on SearchHttpService after form submit without value',() => {
        const spy = spyOn(searchService, 'search').and.callThrough();

        component.searchForm.setValue({
            searchInput: ''
        });
        component.onSubmit();

        expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should not call resetSearch method after form submit without value',() => {
        const spy = spyOn<any>(component, 'resetSearch');

        component.searchForm.setValue({
            searchInput: ''
        });
        component.onSubmit();

        expect(spy).toHaveBeenCalledTimes(0);
    });




    it('should get NewsResults from NewsResponse and provide it to local property newsResults array', () => {
        component.searchForm.setValue({
            searchInput: 'test-value'
        });
        component.onSubmit();
        expect(component.searchResults).toEqual(SEARCH_RESULTS);
    });

    it('should add new results to newsResults array when loading pagination', () => {
        component.searchForm.setValue({
            searchInput: 'test-value'
        });
        component.onSubmit()
        component.loadSearchResults();

        expect(component.searchResults).toEqual([...SEARCH_RESULTS, ...SEARCH_RESULTS]);
    });
});
