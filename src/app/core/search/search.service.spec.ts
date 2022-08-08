import {TestBed} from '@angular/core/testing';

import {SearchService} from './search.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('SearchService', () => {
    let service: SearchService;
    let controller: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SearchService]
        });
        service = TestBed.inject(SearchService);
        controller = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('performLiveSearch', () => {

        it('sets isLoading$ to true', () => {
            let isLoading = false;
            service.isLoading$.subscribe(state => isLoading = state);

            service.performLiveSearch('test');

            expect(isLoading).toBe(true)
        });


    });
});
