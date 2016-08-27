import {Component, OnInit} from '@angular/core';
import {posts_model,postType} from './model/posts';
import {postService} from './services/post.firebase.service';
import {TruncatePipe} from './pipes/truncate';
import {FormBuilder,FormGroup,FormControl, Validators,Validator} from '@angular/forms';
@Component({
    selector: 'App',
    viewProviders:[FormBuilder],
    pipes:[TruncatePipe],
    templateUrl: '/templates/post.firebase.html'
})
export class posts implements OnInit{
    myPost: posts_model;
    fb: FormBuilder;
    myForm: FormGroup;
    posts:Array<any>;

    isNew: boolean = true;

    constructor(fb: FormBuilder,private postService:postService){
        this.fb = fb;
        this.myPost = new posts_model();
        this.myForm = this.fb.group({
            'myPost.txt_id': this.myPost.txt_id,
            'myPost.txt_title': this.myPost.txt_title,
            'myPost.txt_post': this.myPost.txt_post
        });
        this.postService.getAllPost(db => this.postService.data = db);        
    }

    ngOnInit():void {
        
    }
    public newPost(){
         this.setFieldsVal("",{
            title: "",
            text: "",
            created_by: "",
            created_at: ""
        });
    }
    public editClick(objectId: String){
        this.postService.getPostById(objectId,data => this.setFieldsVal(objectId,{title: data.title,text: data.text,created_by: data.created_by,created_at: data.created_at}));
    }

    public onSubmit(): void {
        if (this.isNew){
            this.postService.createPost({title: this.myPost.txt_title.value,text: this.myPost.txt_post.value, created_by:"Shakir Mengrani", created_at: Date.now().toString()});
            this.setFieldsVal("",{title: "",text: "",created_by: "",created_at: ""});
        }else {
            this.postService.updatePost(this.myPost.txt_id.value,{ title: this.myPost.txt_title.value, text: this.myPost.txt_post.value });
        }   
    }

    private setFieldsVal($key:String, val: postType){
        if ($key == ""){
            this.isNew = true;
        }else{
            this.isNew = false;
        }
        this.myPost.txt_id.setValue($key);
        this.myPost.txt_title.setValue(val.title);
        this.myPost.txt_post.setValue(val.text);
    }
    
}
