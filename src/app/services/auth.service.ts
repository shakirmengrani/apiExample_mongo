import {Injectable,NgZone,EventEmitter} from '@angular/core';
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
    private _email: string = "";
    private _password: string = "";
    public err:any = null;
    constructor(http: Http,location: Location,ngZone: NgZone,private router:Router, private fire: AngularFire){
        this.location = location;
        this.ngZone = ngZone;
        this.http = http;
        this.fire.auth.subscribe(auth => this._login(auth));
        // this.fire.auth.error("asd");
        this.fire.auth.toPromise().then(data => console.log({
            "messageShakir": data
        })).catch(err => console.error({
            "messageShakir": err 
        }));
    }

    public setEmail(value: string): void {
        this._email = value;
    }

    public setPassword(value: string): void {
        this._password = value;
    }

    private _login(auth: FirebaseAuthState): void{
        var self = this;
        console.log(auth);
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

    public login(provider: String): Promise<FirebaseAuthState> {
        var logon: Promise<FirebaseAuthState>;
        switch(provider){
            case "google":
                logon = this.fire.auth.login({provider:AuthProviders.Google,method:AuthMethods.Redirect});
            break;
            case "facebook":
                logon = this.fire.auth.login({provider:AuthProviders.Facebook,method:AuthMethods.Redirect,remember: 'default',scope: ['email']});
            break;
            case "custom":
                logon = this.fire.auth.login({email: this._email,password: this._password},{provider: AuthProviders.Password,method: AuthMethods.Password});
            break;
            default:
               logon = this.fire.auth.login({provider:AuthProviders.Google,method:AuthMethods.Redirect});
            break;
        }
        return logon;
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