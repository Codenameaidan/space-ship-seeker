import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
interface commentinfo {
  commentId: number;
  currentDate: any;
  commentTxt: string;
}
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {
  comments= "";
  count=0;
  commentForm= new FormGroup({});
  commentInfo: Array<commentinfo> = [];
  submitted: Boolean = false; 
  public id = 0;
  empty:boolean=true;
  

  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.count = 0
    this.createForm();
    
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.commentForm.value);
    // stop here if form is invalid
    if (this.commentForm.invalid) {
      return false;
    } else {
      this.commentInfo.push({
        commentId : this.id++,
        currentDate : new Date(),
        commentTxt: this.commentForm.controls['comment'].value,
    });
      this.empty=false;
    }
    console.log(this.commentInfo[0]);
    console.log(this.commentInfo[0].commentTxt);
    
    return;
  }

  removeComment(i:number){
    this.commentInfo.splice(i, 1);
    if(this.commentInfo.length<1){
      this.empty = false;
    }
  }
}
 