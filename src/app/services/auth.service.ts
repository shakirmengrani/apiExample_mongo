import {Injectable,NgZone} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {AngularFire,AuthProviders,AuthMethods,FirebaseAuthState} from 'angularfire2'
import {} from 'rxjs/add/operator/toPromise';
import {Headers, Http, Response, Request} from '@angular/http';
@Injectable()
export class AuthService{
    location: Location;
    ngZone: NgZone;
    http: Http = null;
    constructor(http: Http,location: Location,ngZone: NgZone,private router:Router, private fire: AngularFire){
        this.fire.auth.subscribe(auth => this._login(auth));
        this.location = location;
        this.ngZone = ngZone;
        this.http = http;
    }

    private _login(auth: FirebaseAuthState): void{
        var self = this;
        if (auth){
            localStorage.setItem("uid",auth.uid);
            if (auth.google != undefined){
                if(auth.google.idToken != undefined){
                    localStorage.setItem('profile', JSON.stringify(auth.google));
                    localStorage.setItem('id_token', auth.google.idToken);
                    // this.http.get("/login/" + auth.google.idToken).toPromise().then(data => console.log(data));
                    this.ngZone.run(() => self.loggedIn());
                } 
            } else if(auth.facebook != undefined) {
                if (auth.facebook.accessToken != undefined){
                    localStorage.setItem('profile', JSON.stringify(auth.facebook));
                    localStorage.setItem('id_token', auth.facebook.accessToken);
                    // this.http.get("/login/" + auth.google.idToken).toPromise().then(data => console.log(data));
                    this.ngZone.run(() => self.loggedIn());
                }
            }
        }
    }

    public login(provider: String): void {
        switch(provider){
            case "google":
                this.fire.auth.login({provider:AuthProviders.Google,method:AuthMethods.Redirect})
            break;
            case "facebook":
                this.fire.auth.login({provider:AuthProviders.Facebook,method:AuthMethods.Popup,remember: 'default',scope: ['email']})
            break;
            default:
                this.fire.auth.login({provider:AuthProviders.Google,method:AuthMethods.Redirect})
            break;
        }
    }

    public logout() {
      var self = this;
      localStorage.removeItem('profile');
      localStorage.removeItem('id_token');
      localStorage.removeItem("uid");
      this.fire.auth.logout();
      this.ngZone.run(() => self.loggedIn());
    }

    public loggedIn() {
        let uid = localStorage.getItem("uid");
        if(this.router.url == "/login" && uid != null){
            this.router.navigate(['/']);
        }
      return uid;
    }

    public isActive(path) {
        return this.location.path() === path;
    }

}