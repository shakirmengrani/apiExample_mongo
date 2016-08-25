import { Injectable } from '@angular/core';
import {Headers, Http, Response, Request} from '@angular/http';
import {postType} from '../model/posts';
import {AuthHttp,AuthConfig} from 'angular2-jwt'; 
@Injectable()
export class postService{
    public data: Array<postType>;
    constructor(private http:Http){

    }

    public getAllPost():Promise<Array<postType>>{
        return this.http.get("/api/posts").toPromise()
        .then(data => data.json() as Array<postType>)
        .catch(err => console.log(err));
    }

    public createPost(args: postType): void {
        this.data.unshift({
            title: args.title,
            text: args.text,
            created_by: "Shakir Mengrani"
        });
    }

}