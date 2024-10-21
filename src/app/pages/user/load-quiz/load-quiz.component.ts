import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzService } from '../../../services/quizz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent implements OnInit {
 
  catId:any;
  quizzes:any;
  constructor(private _route:ActivatedRoute,
    private _quiz:QuizzService

  ){
  
  }
 
  ngOnInit(): void {

  
  this._route.params.subscribe((params)=>{
    this.catId= params['catId'];
    if(this.catId==0)
      {
        console.log("load all the quiz");
        this._quiz.getActiveQuizzes().subscribe(
          (data:any)=>{
            this.quizzes=data;
            console.log(this.quizzes);
          },(error)=>{
            console.log(error);
            alert('error loading all quizz');
          }
        );
      }else{
        console.log("load specific quizz")
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data)=>{
             this.quizzes=data;
          },
          (error)=>{
             alert('error in loading quizz data');
          }
        )
      }
  })

  
  }

}
