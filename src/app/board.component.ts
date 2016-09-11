import {Component} from '@angular/core';
import { CanActivate } from '@angular/router';
import { Paho } from 'ng2-mqtt';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
    selector: 'App',
    templateUrl: '/templates/board.html'
})

export class board{
    title: String = "";
    private mqtt_client: Paho.MQTT.Client;
    private FGroup: FormGroup;
    private pin: FormControl
    private io: FormControl;    
    public status = "Connecting to the board........";
    constructor(private fBuilder: FormBuilder){
        this.Form_build(fBuilder);
        
        this.mqtt_client = new Paho.MQTT.Client("127.0.0.1",61614,"/led","hello_client");       
        this.mqtt_client.onConnectionLost = (responseObj: Object) => {
            console.debug("Connection was lost");
        };
        
        this.mqtt_client.onMessageArrived = (message: Paho.MQTT.Message) => {
            
        };
        
        this.mqtt_client.connect({
            onSuccess: () => {
                this.status = ""; 
                console.log("Connected !");
                this.mqtt_client.subscribe("led",{
                    onSuccess: () => {
                        console.log("led channel subscribed !");
                    },
                    onFailure: (err) => {
                        console.error(err);
                    }
                }); 
            },
            onFailure: (err) => { 
                console.error(err) 
            }
        });
    }

    public onsubmit():void{
        if (this.io.value != null || this.io.value != undefined){
            this.mqtt_client.send(this.pin.value,this.io.value.toString(),1,false);
            this.setVals({pin: "led",io: 0});
        }
    }

    private Form_build(fb: FormBuilder){
        this.pin = new FormControl('led',[Validators.nullValidator]);
        this.io = new FormControl(0,Validators.pattern('[0-9]+'));
        this.FGroup = fb.group({
            "pin": this.pin,
            "io": this.io
        });
    }

    private setVals(object: {pin: string, io: number}){
        this.pin.setValue(object.pin);
        this.io.setValue(object.io);
    }

    

}
