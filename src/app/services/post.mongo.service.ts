import { Injectable } from '@angular/core';
import {Headers, Http, Response, Request} from '@angular/http';
import {postType} from '../model/posts';

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
        this.data.unshift({title: args.title,text: args.text,created_by: "Shakir Mengrani"});
        this.http.post("/api/posts",{title: args.title,text: args.text,created_by: "Shakir Mengrani"}).toPromise()
        .then(data => data.json() as postType)
        .catch(err => console.error(err));
    }

    public updatePost(args: postType): void{
        this.data.forEach(element => {
            if (element._id == args._id){
                element.title = args.title;
                element.text = args.text;
            }
        });
        
        this.http.put("/api/posts/" + args._id,{title: args.title,text: args.text,created_by: "Shakir Mengrani"}).toPromise()
        .then(data => data.json() as postType)
        .catch(err => console.error(err));
    }

    public getPostById(Id: String):Promise<postType>{
        return this.http.get("/api/posts/" + Id).toPromise()
        .then(data => data.json() as postType)
        .catch(err => console.error(err));
    } 
}