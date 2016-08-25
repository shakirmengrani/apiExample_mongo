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

    public login(provider: String){
        this.Auth.login(provider);
    }
    public loggedIn(){
        return this.Auth.loggedIn();
    }
}