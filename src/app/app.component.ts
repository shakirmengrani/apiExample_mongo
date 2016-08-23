import {Component, NgZone} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
@Component({
    selector: 'App',
    templateUrl: 'templates/index.html'
})


export class App{
    title: String = "";
    private Auth: AuthService;

    constructor(private router: Router,AuthService: AuthService){
        this.title = "Hello from express";
        this.Auth = AuthService;
    }    

    public loggedIn(){
        return this.Auth.loggedIn();
    }

    public logout(){
        this.Auth.logout();
        this.router.navigate(['login']);    
    }

}
