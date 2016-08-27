import { Injectable } from '@angular/core';
import {Headers, Http, Response, Request} from '@angular/http';
import {postType} from '../model/posts';
import {AngularFire, AngularFireDatabase, FirebaseDatabase} from 'angularfire2';
import {PartialObserver} from 'rxjs/Observer';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class postService{
    public data: Array<postType>;
    constructor(private http:Http, private fireDB: AngularFire){
        
    }

    public getAllPost(observerOrNext?: PartialObserver<Array<postType>> | ((value: Array<postType>) => void), error?: (error: any) => void, complete?: () => void): Subscription{
        return this.fireDB.database.list("/db").subscribe(observerOrNext,error,complete);
    }

    public createPost(args: postType): void {
        this.fireDB.database.list("/db").push(args);
    }

    public updatePost($key:String, args: postType):void {
       this.fireDB.database.object("/db/" + $key).update(args)
    }

    public getPostById($key: String,observerOrNext?: PartialObserver<postType> | ((value: postType) => void), error?: (error: any) => void, complete?: () => void):Subscription{
        return this.fireDB.database.object("/db/" + $key).subscribe(observerOrNext,error,complete);
    } 


}