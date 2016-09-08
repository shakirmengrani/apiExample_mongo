import {Component} from '@angular/core';
import { CanActivate } from '@angular/router';

@Component({
    selector: 'App',
    template: 'Empty or Default component'
})

export class OtherApp{
    title: String = "";
    constructor(){
        this.title = "Hello other from express";
    }
}
