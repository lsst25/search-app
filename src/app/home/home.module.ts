import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomeComponent } from './home.component';
import { SearchResultTileComponent } from './search-result-tile/search-result-tile.component';
import { BadgeComponent } from '../shared/badge/badge.component';
import { MiniCardComponent } from '../shared/mini-card/mini-card.component';
import { SpinnerComponent } from '../shared/loaders/spinner/spinner.component';

@NgModule({
  declarations: [HomeComponent, SearchResultTileComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    SpinnerComponent,
    BadgeComponent,
    MiniCardComponent,
  ],
})
export class HomeModule {}
