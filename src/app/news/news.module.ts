import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { NewsRoutingModule } from './news-routing.module'
import { NewsComponent } from './news.component'
import { NewsTileComponent } from './news-tile/news-tile.component'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { SpinnerComponent } from '../shared/loaders/spinner/spinner.component'

@NgModule({
  declarations: [NewsComponent, NewsTileComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    InfiniteScrollModule,
    SpinnerComponent,
  ],
})
export class NewsModule {}
