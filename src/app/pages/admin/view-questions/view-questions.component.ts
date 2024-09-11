import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrl: './view-questions.component.css'
})
export class ViewQuestionsComponent  implements OnInit{
  
  qId:any;
  qTitle:any;
  questions=[ {

    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',

  }];


  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService
  ){}


  ngOnInit(): void {
   
this.qId= this._route.snapshot.params['qid'];
this.qTitle= this._route.snapshot.params['title'];

this._question.getQuestionOfQuiz(this.qId).subscribe(
  (data:any)=>{
    console.log(data);
    this.questions=data;
  },(error)=>{
    console.log(error);
  }
);
  }

}
