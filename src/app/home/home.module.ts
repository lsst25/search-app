import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {SearchResultTileComponent} from './search-result-tile/search-result-tile.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        HomeComponent,
        SearchResultTileComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule
    ]
})
export class HomeModule {
}
