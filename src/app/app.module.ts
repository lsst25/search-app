import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutComponent} from './layout/layout.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SearchRequestsInterceptor} from "./http/search-requests.interceptor";

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: SearchRequestsInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
