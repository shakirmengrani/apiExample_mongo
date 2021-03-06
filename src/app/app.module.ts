import {NgModule,enableProdMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {App} from './app';
import {OtherApp} from './other.component';
import {board} from './board.component';
import {login} from './login.component';
import {posts} from './posts.firebase.component';
import {postService} from './services/post.firebase.service';
import { APP_ROUTER_PROVIDER, appRoutes } from './app.routes';
import { AuthGuard } from './auth-guard'; 
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpModule,JsonpModule, Http } from '@angular/http';
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
    declarations: [App,OtherApp,login,posts,board],
    imports: [BrowserModule,HttpModule,JsonpModule,
    RouterModule.forRoot(appRoutes,{ useHash: true }),HttpModule,ReactiveFormsModule
    ,AngularFireModule.initializeApp(myFirebaseConfig)
    ],
    providers: [postService,FIREBASE_PROVIDERS,APP_ROUTER_PROVIDER,AuthService, AuthGuard],
    bootstrap:[App]
})
 
export class AppModule {
    
}