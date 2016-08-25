import {Component, OnInit} from '@angular/core';
import {posts_model} from './model/posts';
import {postService} from './services/post.service';
import {FormBuilder,FormGroup,FormControl, Validators,Validator} from '@angular/forms';
@Component({
    selector: 'App',
    viewProviders:[FormBuilder],
    templateUrl: 'templates/posts.html'
})
export class posts implements OnInit{
    myPost: posts_model;
    fb: FormBuilder;
    myForm: FormGroup;
    posts:Array<any>;
    constructor(fb: FormBuilder,private postService:postService){
        this.fb = fb;
        this.myPost = new posts_model();
        this.myForm = this.fb.group({
            'myPost.txt_title': this.myPost.txt_title,
            'myPost.txt_post': this.myPost.txt_post
        });
        
    }

    ngOnInit():void {
        this.postService.getAllPost().then(data => this.posts = data).catch(err => console.error(err));
    }

    public onSubmit(): void {
        console.log(this.myPost.txt_title);
    }
    
}
