import {Injectable} from '@angular/core';
import {hero} from '../model/Hero';
import {Headers, Http, Response, Request} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService{
    private apiUrl: string = "/api/posts";

    constructor (private http: Http){

    }


    getHeros():Promise<hero[]> {
            
        return this.http.get(this.apiUrl)
            .toPromise()
            .then(response => response.json() as hero[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}