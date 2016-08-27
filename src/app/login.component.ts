import {Component, OnInit} from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import {AuthService} from './services/auth.service';
@Component({
    selector:'App',
    viewProviders:[FormBuilder],
    templateUrl: '/templates/login.html'
})


export class login implements OnInit{
    Auth: AuthService;
    private fb: FormBuilder;
    private loginForm: FormGroup;
    private email: FormControl;
    private password: FormControl;
    err = {
        message: String(),
        type: String()
    };

    ngOnInit():void{
      if (this.err.type != "success"){
        this.err = {
          message: "",
          type: ""
        };
      }
    }

    constructor(AuthService: AuthService,fb:FormBuilder){
        this.Auth = AuthService;
        this.fb = fb;
        this.email = new FormControl('',Validators.required);
        this.password = new FormControl('',Validators.required);
        this.loginForm = fb.group({'email': this.email,'password': this.password});
    }

    public login(provider: String){
        if (provider == "custom"){
            this.Auth.setEmail(this.email.value);
            this.Auth.setPassword(this.password.value);
        }
        this.Auth.login(provider)
        .then(auth => this.err = {message:"Login successfully !", type: "success"})
        .catch(err => this.err = {message:err.message, type:"danger"});
    }
    public loggedIn(){
        return this.Auth.loggedIn();
    }
}