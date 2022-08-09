import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {SearchServiceMock} from "../mocks/search-service-mock";
import {ReactiveFormsModule} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {SearchHttpService} from "../core/search/search-http.service";
import {SEARCH_RESULTS} from "../mocks/mock-consts";
import {throwError} from "rxjs";

const PAGINATION_STEP: number = 20;
const TOTAL_SEARCH_RESULTS = 300;

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let searchService: SearchHttpService;

    function setSearchInputModelValue(value: string) {
        component.searchForm.setValue({
            searchInput: value
        });
    }

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

            setSearchInputModelValue('test-value');
            component.onSubmit();

            expect(spy).toHaveBeenCalledOnceWith('test-value', 0, 20);
        }
    );

    it('should cancel pagination increment in case of error when loading pagination',
        () => {
            const cancelPaginationSpy = spyOn<any>(component, 'canselPaginationOffset').and.callThrough();

            setSearchInputModelValue('test-value');
            component.onSubmit();

            const errorResponse = new Error('error');
            const serviceSpy = spyOn(searchService, 'search').and.returnValue(throwError(errorResponse));

            component.loadSearchResults();

            expect(component['paginationOffset']).toBe(PAGINATION_STEP);
            expect(serviceSpy).toHaveBeenCalledTimes(1);
            expect(cancelPaginationSpy).toHaveBeenCalledTimes(1);
        }
    );

    it('should set currentSearchValue to the input value after form submit',() => {
        setSearchInputModelValue('test-value');
        component.onSubmit();

        expect(component['currentSearchValue']).toBe('test-value');
    });

    it('should call resetSearch method after form submit',() => {
        const spy = spyOn<any>(component, 'resetSearch');

        setSearchInputModelValue('test-value');
        component.onSubmit();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not call search method on SearchHttpService after form submit without value',() => {
        const spy = spyOn(searchService, 'search').and.callThrough();

        setSearchInputModelValue('');
        component.onSubmit();

        expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should not call search method on SearchHttpService if all search results are loaded ',() => {
        const spy = spyOn(searchService, 'search').and.callThrough();
        component['currentSearchValue'] = 'test-value';
        component['totalSearchResults'] = TOTAL_SEARCH_RESULTS;
        component.searchResults.length = TOTAL_SEARCH_RESULTS;

        component.loadSearchResults()

        expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should not call resetSearch method after form submit without value',() => {
        const spy = spyOn<any>(component, 'resetSearch');

        setSearchInputModelValue('');
        component.onSubmit();

        expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should get NewsResults from NewsResponse and provide it to local property newsResults array', () => {
        setSearchInputModelValue('test-value');
        component.onSubmit();
        expect(component.searchResults).toEqual(SEARCH_RESULTS);
    });

    it('should add new results to newsResults array when loading pagination', () => {
        setSearchInputModelValue('test-value');
        component.onSubmit()
        component.loadSearchResults();

        expect(component.searchResults).toEqual([...SEARCH_RESULTS, ...SEARCH_RESULTS]);
    });

    it('should increment pagination', () => {
        setSearchInputModelValue('test-value');
        component.onSubmit()

        expect(component['paginationOffset']).toBe(PAGINATION_STEP);
    });

    it('should increment pagination when loading pagination', () => {
        setSearchInputModelValue('test-value');
        component.onSubmit()
        component.loadSearchResults();

        expect(component['paginationOffset']).toBe(PAGINATION_STEP * 2);
    });
});
