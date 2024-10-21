import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { Router } from '@angular/router';
import { QuizzService } from '../../../services/quizz.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css'
})
export class UpdateQuestionComponent implements OnInit{
  
  qId:any;
  qTitle:any;
  questions:any;
  // questions:any={
  //   quizz:{
  //       qId:'0',

  //   },
  //   content:'',
  //   option1:'',
  //   option2:'',
  //   option3:'',
  //   option4:'',
  //   answer:'',
  // }
  


   
  

  constructor(private _route:ActivatedRoute,
    private _question:QuestionService,
    private _router:Router,
    private quiz:QuizzService,
    
    
  ){}
  
  ngOnInit(): void {

    this.qId= this._route.snapshot.params['qid'];
 this.qTitle= this._route.snapshot.params['title'];

this._question.getQuestionOfQuizz(this.qId).subscribe(
  (data:any)=>{
    this.questions=data;
    console.log(this.questions);
  },
  (error:any)=>{
    console.log(error)  
  }
 );

 

  }



  public updateData()
  
  {
   
    /// validation
    this._question.updateQuestion(this.questions).subscribe((data)=>{
       Swal.fire('Success','Question Update Success','success').then(()=>{
        this._router.navigate([`/admin/view-questions/${this.qId}/${this.qTitle}`]);
       });
    },(error)=>{
      Swal.fire('error','error in updating quiz ','error');
    }); 
  }


}
