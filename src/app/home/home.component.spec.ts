import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {SearchService} from "../core/search/search.service";
import {SearchServiceMock} from "../mocks/search-service-mock";
import {By} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let searchService: SearchService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomeComponent],
            imports: [ReactiveFormsModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {
                    provide: SearchService,
                    useClass: SearchServiceMock
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        searchService = TestBed.inject(SearchService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should perform live search on Search Service after input with input value',
        () => {
            const spy = spyOn(searchService, 'performLiveSearch');
            const searchInput = fixture.debugElement.query(By.css('[data-testid="search-input"]'));

            searchInput.nativeElement.value = 'test';
            searchInput.nativeElement.dispatchEvent(new Event('input'));
            component.onInput();


            fixture.detectChanges();
            expect(spy).toHaveBeenCalledOnceWith('test')
        }
    );
});
