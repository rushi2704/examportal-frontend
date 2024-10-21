import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzService } from '../../../services/quizz.service';
import { log } from 'console';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent implements OnInit {
  

  qid:any;
  quiz:any;
  
  countdown: number = 10;  // Timer starts at 10 seconds
  isQuizStarted: boolean = false;  // Tracks if the quiz is started
  timer: any;  // Holds the setInterval instance


  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizzService,
    private _router:Router
  ){}
  
  
  ngOnInit(): void {
   this.qid=this._route.snapshot.params['qid'];
   console.log(this.qid);
   this._quiz.getQuiz(this.qid).subscribe(
    (data:any)=>{
      console.log(data);
      this.quiz=data;
    },(error)=>{
      console.log(error);
      alert("Error in loading quizz data");
    }
   );
  }

  //  // Method to start the countdown
  //  startCountdown() {
  //   this.countdown = 10;
  //   this.isQuizStarted = false;

  //   this.timer = setInterval(() => {
  //     if (this.countdown > 0) {
  //       this.countdown--;
  //     } else {
  //       this.startQuiz();
  //       clearInterval(this.timer);  // Stops the timer when countdown is over
  //     }
  //   }, 1000);  // 1-second interval
  // }

  // Method to start the quiz after countdown ends
  startQuiz() {
    
    Swal.fire({
      title: "Do you want to start the quiz?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
     
      confirmButtonText: "Start"
    }).then((result:any) => {
      if (result.isConfirmed) {
      this._router.navigate(['/start/'+this.qid])
      }
    });
  }

}
