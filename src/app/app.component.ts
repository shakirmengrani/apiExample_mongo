import {Component, NgZone} from '@angular/core';
import {Location} from '@angular/common';
import {tokenNotExpired,JwtHelper} from 'angular2-jwt';
import {AngularFire} from 'angularfire2'

declare var Auth0Lock;

@Component({
    selector: 'App',
    templateUrl: 'templates/index.html'
})


export class App{
    
    lock = new Auth0Lock('culT56Ee0Z4YGr6maELmnj7loEDlbUy2', '76dev.auth0.com');
    jwtHelper: JwtHelper = new JwtHelper();
    location: Location;
    ngZone: NgZone;

    title: String = "";
    constructor(location: Location,ngZone: NgZone, public fire: AngularFire ){
        this.fire.auth.subscribe(auth => this._login(auth));

        this.location = location;
        this.ngZone = ngZone;
        this.title = "Hello from express";
    }

    private _login(auth: any): void{
        var self = this;
        if (auth){
            if (auth.google.idToken != undefined){
                localStorage.setItem('profile', JSON.stringify(auth.google));
                localStorage.setItem('id_token', auth.google.idToken);
                this.jwtHelper.decodeToken(auth.google.idToken),
                this.jwtHelper.getTokenExpirationDate(auth.google.idToken),
                this.jwtHelper.isTokenExpired(auth.google.idToken)
                this.ngZone.run(() => self.loggedIn());
            }
        }
    }
    public login(): void {
        this.fire.auth.login();
    }

  public logout() {
      localStorage.removeItem('profile');
      localStorage.removeItem('id_token');
      this.fire.auth.logout();
      this.loggedIn();
    }

    public loggedIn() {
      return tokenNotExpired();
    }

    public isActive(path) {
        return this.location.path() === path;
    }

}
