import { Injectable } from '@angular/core';
import {Headers, Http, Response, Request} from '@angular/http';
import {posts_model,postType} from '../model/posts'; 
@Injectable()
export class postService{
    constructor(private http:Http){

    }

    public getAllPost():Promise<Array<postType>>{
        return this.http.get("/api/posts").toPromise()
        .then(data => data.json() as Array<postType>)
        .catch(err => console.log(err));
    }




}