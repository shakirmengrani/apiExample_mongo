import {Component} from '@angular/core';

@Component({
    selector: 'App',
    template: 'Empty or Default component'
})

export class OtherApp {
    title: String = "";

    constructor(){
        this.title = "Hello other from express";
    }

}
