import {Injectable,NgZone} from '@angular/core';
import {Location} from '@angular/common';
import {tokenNotExpired,JwtHelper} from 'angular2-jwt';
import {AngularFire,AuthProviders,AuthMethods,FirebaseAuth} from 'angularfire2'
import {} from 'rxjs/add/operator/toPromise';
import {Headers, Http, Response, Request} from '@angular/http';
@Injectable()
export class AuthService{
    jwtHelper: JwtHelper = new JwtHelper();
    location: Location;
    ngZone: NgZone;
    http: Http = null;
    constructor(http: Http,location: Location,ngZone: NgZone, public fire: AngularFire){
        this.fire.auth.subscribe(auth => this._login(auth));
        this.location = location;
        this.ngZone = ngZone;
        this.http = http;
    }

    private _login(auth: any): void{
        var self = this;
        if (auth){
            if (auth.google != undefined){
                if(auth.google.idToken != undefined){
                    localStorage.setItem('profile', JSON.stringify(auth.google));
                    localStorage.setItem('id_token', auth.google.idToken);
                    this.jwtHelper.decodeToken(auth.google.idToken);
                    this.jwtHelper.getTokenExpirationDate(auth.google.idToken);
                    this.jwtHelper.isTokenExpired(auth.google.idToken);
                    // this.http.get("/login/" + auth.google.idToken).toPromise().then(data => console.log(data));
                    this.ngZone.run(() => self.loggedIn());
                } 
            } else if(auth.facebook != undefined) {
                if (auth.facebook.accessToken != undefined){
                    localStorage.setItem('profile', JSON.stringify(auth.facebook));
                    localStorage.setItem('id_token', auth.facebook.accessToken);
                    this.jwtHelper.decodeToken(auth.facebook.accessToken);
                    this.jwtHelper.getTokenExpirationDate(auth.facebook.accessToken);
                    this.jwtHelper.isTokenExpired(auth.facebook.accessToken);
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
      this.fire.auth.logout();
      this.ngZone.run(() => self.loggedIn());
    }

    public loggedIn() {
      return tokenNotExpired();
    }

    public isActive(path) {
        return this.location.path() === path;
    }

}