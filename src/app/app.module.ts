import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { LayoutComponent } from './layout/layout.component'
import { NavbarComponent } from './layout/navbar/navbar.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { SearchRequestsInterceptor } from './http/search-requests.interceptor'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects'
import { HomeEffects } from "./news/home.effects";
import { reducers } from "./app.state";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent, LayoutComponent, NavbarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([HomeEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SearchRequestsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
