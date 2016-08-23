import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
@Component({
    selector:'App',
    templateUrl: 'templates/login.html'
})


export class login {
    Auth: AuthService;
    constructor(AuthService: AuthService){
        this.Auth = AuthService;
    }

    public login(){
        this.Auth.login();
    }
    public loggedIn(){
        return this.Auth.loggedIn();
    }
}