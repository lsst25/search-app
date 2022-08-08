import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {SearchServiceMock} from "../mocks/search-service-mock";
import {By} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {SearchHttpService} from "../core/search/search-http.service";

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

    it('should call search method on Search Service on submit with input value',
        () => {
            const spy = spyOn(searchService, 'search').and.callThrough();
            const searchInput = fixture.debugElement.query(By.css('[data-testid="search-input"]'));
            component['paginationOffset'] = 0;

            searchInput.nativeElement.value = 'test';
            searchInput.nativeElement.dispatchEvent(new Event('input'));


            fixture.detectChanges();
            expect(spy).toHaveBeenCalledOnceWith('test', 0, 20)
        }
    );
});
