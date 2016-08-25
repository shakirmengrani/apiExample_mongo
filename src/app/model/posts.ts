import {FormControl,Validators} from '@angular/forms';
import {Http} from '@angular/http';
import {} from 'rxjs/add/operator/toPromise';
interface iPost{
     txt_title: FormControl,
     txt_post: FormControl
}

export interface postType  {
        _id?:String,
        title:String, 
        text:String,
        created_by?:String,
        created_at?:String
};

export class posts_model implements iPost{
    
    txt_title: FormControl;
    txt_post: FormControl;
    
    public static data: Array<postType> = [];
    
    constructor(){
        this.txt_title = new FormControl('',Validators.required);
        this.txt_post = new FormControl('',Validators.required);
    }

    public add(args:iPost): void {
        posts_model.data.push({
            title: args.txt_title.value,
            text: args.txt_post.value
        });
    }
	
	public getObjAt(Index:number): postType{
		return posts_model.data[Index];
	}

}