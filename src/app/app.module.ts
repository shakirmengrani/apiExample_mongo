import {NgModule, bind,provide,enableProdMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {App} from './app.component';
import {OtherApp} from './other.component';
import {login} from './login.component';
import {posts} from './posts.component';
import {HeroService} from './services/hero.service';
import { APP_ROUTER_PROVIDER, appRoutes } from './app.routes';
import { AuthGuard } from './auth-guard'; 
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpModule, HTTP_PROVIDERS, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {  AuthHttp, AuthConfig } from 'angular2-jwt';
import {AngularFireModule,AuthMethods,AuthProviders,defaultFirebase} from 'angularfire2'
import {AuthService} from './services/auth.service';
const myFirebaseConfig = {
    apiKey: "AIzaSyCJ4ndIzSPdKkCICM5tJuILIgMfMFichII",
    authDomain: "shakirmengrani-8c9b1.firebaseapp.com",
    databaseURL: "https://shakirmengrani-8c9b1.firebaseio.com",
    storageBucket: "shakirmengrani-8c9b1.appspot.com",
}

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
}
enableProdMode();
@NgModule({
    declarations: [App,OtherApp,login,posts],
    providers: [
        APP_ROUTER_PROVIDER,
        HeroService,
        AuthService, 
        HTTP_PROVIDERS,
        bind(LocationStrategy).toClass(HashLocationStrategy),
        // provide(AuthConfig, { useFactory: () => { return new AuthConfig(); } }),
        // AuthHttp,
        AuthGuard
        ],
    imports: [BrowserModule,RouterModule.forRoot(appRoutes),HttpModule,FormsModule
    ,AngularFireModule.initializeApp(myFirebaseConfig,myFirebaseAuthConfig)
    ],
    bootstrap:[App]
})
 
export class AppModule {
    
}