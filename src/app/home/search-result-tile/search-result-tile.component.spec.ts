import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultTileComponent } from './search-result-tile.component';

describe('SearchResultTileComponent', () => {
  let component: SearchResultTileComponent;
  let fixture: ComponentFixture<SearchResultTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
