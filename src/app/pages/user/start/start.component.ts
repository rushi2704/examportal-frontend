import { LocationStrategy } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit {


  qid:any;
  questions:any;

  marksGot=0;
  correctAnswer=0;
  attempted=0;
  isSubmit=false;

  timer:any;
 
// Inject LocationStrategy Service into your component
constructor(
  private locationStrategy: LocationStrategy,
  private _route:ActivatedRoute,
  private _question:QuestionService
) { }
  
ngOnInit(): void {
    this.preventBackButton();
    this.qid= this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();

     }

  loadQuestions()
  {
    this._question.getQuestionOfQuizzForTest(this.qid).subscribe(
      (data:any)=>{
        this.questions=data;

        this.timer=this.questions.length*60;

        //not require for server side coz we create givenAnswer at backend 
        // this.questions.forEach((q:any) => {
        //   q['givenAnswer']='';      
        // });
        console.log(this.questions);
        this.startTimer();

      },(error:any)=>{
        console.log(error);
      }
    )
  }


// Define a function to handle back button and use anywhere
preventBackButton() {
  history.pushState(null,'',  location.href);
  this.locationStrategy.onPopState(() => {
    history.pushState(null, '', location.href);
  })
}
// this code fo disable right click after exam start 
@HostListener('document:contextmenu', ['$event'])
onRightClick(event: MouseEvent) {
  event.preventDefault(); // This will disable the right-click
}

  submitQuiz()
  {
    Swal.fire({
      title:'Do you want to submit the quiz',
      showCancelButton:true,
      confirmButtonText:'Submit',
      icon:'info',
    }).then((e)=>{
      if(e.isConfirmed){
         // calculation
       this.evalQuiz();
      }
    });
  }


  startTimer()
  {
  let t =  window.setInterval(()=>{
      if(this.timer<=0)
      {
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTime()
  {
    let min =Math.floor(this.timer/60);
    let sec= this.timer-min*60;
    return  `${min} min : ${sec} sec`;
  }


  // this fuction use for submit quiz
    evalQuiz()
    {


      // call to server to check question 
      this._question.evalQuiz(this.questions).subscribe(
        (data:any)=>{
          
          console.log(data);  
          this.marksGot =parseFloat(Number(data.marksGot).toFixed(2));
          this.correctAnswer  = data.correctAnswer;
          this.attempted  = data.attempted;
         
          this.isSubmit=true;
          
        },(error)=>{
          console.log(error);
        }
      )

      // this.isSubmit=true;
      // this.questions.forEach((q:any)=>{
      //  if(q.givenAnswer==q.answer)
      //  {
      //    this.correctAnswer++;
      //   let marksSingle = this.questions[0].quizz.maxMarks/this.questions.length;
      //    this.marksGot += marksSingle;
      //  }
       
      //  if(q.givenAnswer.trim()!=''){
      //      this.attempted++;
      //  }

      // });
      // console.log("correct answer: "+this.correctAnswer);
      //  console.log("mark got: "+this.marksGot);
      //  console.log("attempedt: "+this.attempted);
    }
}
