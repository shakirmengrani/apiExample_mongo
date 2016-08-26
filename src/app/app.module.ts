import {NgModule, bind,provide,enableProdMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {App} from './app';
import {OtherApp} from './other.component';
import {login} from './login.component';
import {posts} from './posts.component';
import {postService} from './services/post.service';
import { APP_ROUTER_PROVIDER, appRoutes } from './app.routes';
import { AuthGuard } from './auth-guard'; 
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpModule, HTTP_PROVIDERS, Http } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import {AngularFireModule,AuthMethods,AuthProviders,defaultFirebase,FIREBASE_PROVIDERS} from 'angularfire2'
import {AuthService} from './services/auth.service';
const myFirebaseConfig = {
    apiKey: "AIzaSyCJ4ndIzSPdKkCICM5tJuILIgMfMFichII",
    authDomain: "shakirmengrani-8c9b1.firebaseapp.com",
    databaseURL: "https://shakirmengrani-8c9b1.firebaseio.com",
    storageBucket: "shakirmengrani-8c9b1.appspot.com",
}

@NgModule({
    declarations: [App,OtherApp,login,posts],
    providers: [
        postService,
        APP_ROUTER_PROVIDER,
        AuthService, 
        HTTP_PROVIDERS,
        bind(LocationStrategy).toClass(HashLocationStrategy),
        AuthGuard
        ],
    imports: [BrowserModule,
    RouterModule.forRoot(appRoutes),HttpModule,ReactiveFormsModule
    ,AngularFireModule.initializeApp(myFirebaseConfig)
    ],
    bootstrap:[App]
})
 
export class AppModule {
    
}