import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrl: './view-questions.component.css'
})
export class ViewQuestionsComponent  implements OnInit{
  
  qId:any;
  qTitle:any;
  questions=[ {

    qId:'',
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

  // delete question 
  deleteQuestion(qid:any)
  {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result)=>{
      if(result.isConfirmed)
      {
        this._question.deleteQuestion(qid).subscribe(
          (data)=>{
            this.questions=this.questions.filter((questions)=>questions.qId!=qid);
            Swal.fire('Success','Question deleted','success');
          }, (error)=>{
            Swal.fire('error','error while deleting','error');
        
          }
        
        );

      }
    })

    
  }

}


