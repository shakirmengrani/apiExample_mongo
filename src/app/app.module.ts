import {NgModule, bind,provide} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {App} from './app.component';
import {OtherApp} from './other.component';
import {login} from './login.component';
import {HeroService} from './services/hero.service';
import { APP_ROUTER_PROVIDER, appRoutes } from './app.routes';
import { AuthGuard } from './auth-guard'; 
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpModule, HTTP_PROVIDERS, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {  AuthHttp, AuthConfig } from 'angular2-jwt';
@NgModule({
    declarations: [App,OtherApp,login],
    providers: [
        APP_ROUTER_PROVIDER,
        HeroService, 
        HTTP_PROVIDERS,
        bind(LocationStrategy).toClass(HashLocationStrategy),
        provide(AuthConfig, { useFactory: () => { return new AuthConfig(); } }),
        AuthHttp,
        AuthGuard
        ],
    imports: [BrowserModule,RouterModule.forRoot(appRoutes),HttpModule,FormsModule],
    bootstrap:[App]
})
 
export class AppModule {
    
}