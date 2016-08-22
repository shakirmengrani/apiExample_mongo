import {Component,EventEmitter,OnInit,Input,Output} from '@angular/core';
import {HeroService} from './services/hero.service';
import {hero} from './model/hero';
@Component({
    selector: 'App',
    templateUrl: 'templates/index.html',
    
})

export class App{

    title: String = "";
    heros: hero[];
    constructor(private heroService: HeroService){
        this.title = "Hello from express";
        heroService.getHeros().then( data => this.heros = data );
    }
}
