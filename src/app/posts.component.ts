import {Component, OnInit} from '@angular/core';
import {posts_model,postType} from './model/posts';
import {postService} from './services/post.service';
import {TruncatePipe} from './pipes/truncate';
import {FormBuilder,FormGroup,FormControl, Validators,Validator} from '@angular/forms';
@Component({
    selector: 'App',
    viewProviders:[FormBuilder],
    pipes:[TruncatePipe],
    template: `
<div class="row">    
    <div class="col-lg-6 col-md-6">
        <div class="panel panel-primary">
            <div class="panel-heading">Post Form  <input type="hidden" [formControl]="myPost.txt_id" /><button class="btn btn-info col-sm-offset-6" (click)="newPost()">Add New</button></div>
            <div class="panel-body">
                <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
                    <div class="col-lg-12 form-group">
                        <label>Title</label><br />
                        <input type="text" class="form-control" [formControl]="myPost.txt_title" placeholder="Title" />
                    </div>
                    <div class="col-lg-12 form-group">
                        <label>Text</label><br />
                        <textarea class="form-control" [formControl]="myPost.txt_post" rows="8"></textarea>
                    </div>
                    <div class="col-lg-12 form-group">
                        <button class="btn btn-default" type="submit" [disabled]="!myForm.valid">Submit</button>
                    </div>
                </form>
            </div>
            <div class="panel-footer"></div>
        </div>
    </div>
    <div class="col-lg-6 col-md-6">
        <div class="panel panel-default" *ngFor="let item of postService.data">
            <div class="panel-heading"><strong>{{ item.title | truncate:[50] }} </strong></div>
            <div class="panel-body">
                {{ item.text }}
            </div>
            <div class="panel-footer" align="right">
                <button *ngIf="item._id" class="btn btn-warning" (click)="editClick(item._id)"><i class="fa fa-edit"></i> edit</button> | <a href="#"> {{ item.created_at | date:'MMMM, d-y' }} | {{ item.created_by }}</a>
            </div>
        </div>
    </div>
</div>`
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
        this.postService.getAllPost().then(data => this.postService.data = data).catch(err => console.error(err));        
    }

    ngOnInit():void {
        
    }
    public newPost(){
         this.setFieldsVal({
            _id: "",
            title: "",
            text: "",
            created_by: "",
            created_at: ""
        });
    }
    public editClick(objectId: String){
        this.postService.getPostById(objectId)
        .then(data => this.setFieldsVal({_id: data._id,title: data.title,text: data.text,created_by: data.created_by,created_at: data.created_at}))
        .catch(err => console.error(err));
    }

    public onSubmit(): void {
        if (this.isNew){
            this.postService.createPost({title: this.myPost.txt_title.value,text: this.myPost.txt_post.value});
            this.setFieldsVal({_id: "",title: "",text: "",created_by: "",created_at: ""});
        }else {
            this.postService.updatePost({ _id: this.myPost.txt_id.value, title: this.myPost.txt_title.value, text: this.myPost.txt_post.value });
        }   
    }

    private setFieldsVal(val: postType){
        if (val._id == ""){
            this.isNew = true;
        }else{
            this.isNew = false;
        }
        this.myPost.txt_id.setValue(val._id);
        this.myPost.txt_title.setValue(val.title);
        this.myPost.txt_post.setValue(val.text);
    }
    
}
