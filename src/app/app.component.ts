import {Component, NgZone} from '@angular/core';
import {Location} from '@angular/common';
import {tokenNotExpired,JwtHelper} from 'angular2-jwt';
import {HeroService} from './services/hero.service';
import {hero} from './model/hero';

// declare var Auth0Lock: any;

@Component({
    selector: 'App',
    templateUrl: 'templates/index.html',
    
})


export class App{
    
    lock = new Auth0Lock('gL4tLAdSGsGMGmMgjDX2DFFsqp3DAMYT', '76dev.auth0.com');
    jwtHelper: JwtHelper = new JwtHelper();
    location: Location;
    ngZone: NgZone;


    title: String = "";
    heros: hero[];
    constructor(private heroService: HeroService,location: Location,ngZone: NgZone){
        this.location = location;
        this.ngZone = ngZone;
        this.title = "Hello from express";
        heroService.getHeros().then( data => this.heros = data );
    }
}
