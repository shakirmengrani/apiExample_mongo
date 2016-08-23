import {Component} from '@angular/core';
import { CanActivate } from '@angular/router';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import {HeroService} from './services/hero.service';
import {hero} from './model/hero';
@Component({
    selector: 'App',
    templateUrl: 'templates/posts.html'
})

export class posts{
    title: String = "";
    heros: hero[]  = [];

    constructor(private heroService: HeroService){
        this.title = "Hello other from express";
        heroService.getHeros().then( data => this.heros = data );
    }
}
