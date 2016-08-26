import {Component, NgZone} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
@Component({
    selector: 'App',
    template: `
<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" [routerLink]="['']">Brand</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li><a *ngIf="loggedIn()" [routerLink]="['/posts']"><i class="fa fa-forumbee fa-fw" aria-hidden="true"></i>posts</a></li>
      </ul>

      <ul class="nav navbar-nav navbar-right">
        <li><a *ngIf="!loggedIn()" [routerLink]="['/login']" class="btn"><i class="fa fa-sign-in fa-fw" aria-hidden="true"></i>Login</a></li>
        <li><a *ngIf="loggedIn()" (click)="logout()" class="btn"><i class="fa fa-sign-in fa-fw" aria-hidden="true"></i>Logout</a></li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
<router-outlet></router-outlet>`
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
