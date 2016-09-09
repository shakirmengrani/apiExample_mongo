import {Component, OnInit} from '@angular/core';
import { CanActivate } from '@angular/router';
import { Paho } from 'ng2-mqtt';

@Component({
    selector: 'App',
    template: 'Empty or Default component'
})

export class OtherApp implements OnInit{
    title: String = "";
    private mqtt_client: Paho.MQTT.Client;

    constructor(){
        this.title = "Hello other from express";
        this.mqtt_client = new Paho.MQTT.Client("localhost",3000,"abcdefghij");
        this.mqtt_client.onConnectionLost = (responseObj: Object) => {
            console.debug("Connection was lost");
        };
        this.mqtt_client.onMessageArrived = (message: Paho.MQTT.Message) => {
            console.log(message);
        };
        
        this.mqtt_client.connect({
            onSuccess: this.onConnect.bind(this)
        });
    }

    ngOnInit(){

    }

    private onConnect(): void{
        console.log("Connected !");
    }

}
