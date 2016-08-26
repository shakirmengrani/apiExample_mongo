import {Component, OnInit} from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import {AuthService} from './services/auth.service';
@Component({
    selector:'App',
    viewProviders:[FormBuilder],
    template: `
<div class="col-sm-6 col-sm-offset-3">
    <div class="panel panel-info">
        <div class="panel-heading">Login !</div>
        <div class="panel-body">
            <div *ngIf="err.message" class="alert alert-{{err.type}}">{{err.message}}</div>
            <form [formGroup]="loginForm">
            <div class="form-group">
                <label>Email</label>
                <input type="text" [formControl]="email" class="form-control" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" [formControl]="password" class="form-control" />
            </div>
            <div class="col-sm-12">
                <button class="col-sm-4 btn btn-success" (click)="login('custom')"><i class="fa fa-sign-in fa-fw" aria-hidden="true"></i> Login </button>
                <button class="col-sm-4 btn btn-primary" (click)="login('facebook')"><i class="fa fa-facebook-square fa-fw" aria-hidden="true"></i>acebook </button>
                <button class="col-sm-4 btn btn-danger" (click)="login('google')"> <i class="fa fa-google-plus-square fa-fw" aria-hidden="true"></i>oogle </button>
            </div>
            </form>
        </div>
    </div>
</div>
`
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