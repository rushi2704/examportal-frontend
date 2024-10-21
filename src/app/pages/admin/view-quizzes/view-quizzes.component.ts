import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { QuizzService } from '../../../services/quizz.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { error } from 'console';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit {

  quiz=[
  {
    qId: 1,
    title:'java',
    active: '',
    description: 'This is a sample quiz description. It covers topics on Angular basics.',
    maxMarks: '100',
    numberQuestions: '10',
    categoryCid: 101,
    category:{
           title:'programming',
    },
  
  },
  // {
  //   active: '',
  //   description: 'This is a sample quiz description. It covers topics on Angular basics.',
  //   max_mark: '100',
  //   number_question: '10',
  //   title: 'Angular Basics Quiz',
  //   category_cid: 101,
  //   category:{
  //          title:'programming',
  //   },
  
  // },
  ];

  constructor(private _quizz:QuizzService){

  }


  ngOnInit(): void {

    this._quizz.quizzes().subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(this.quiz);
        
      },
      (error)=>{
        console.log( error);
        Swal.fire('Error','Error in loading data','error');
        
      }
    );
  }

    // delete quizz 
     deleteQuiz(qId:any)
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
        this._quizz.deleteQuiz(qId).subscribe(
          (data)=>{
            this.quiz=this.quiz.filter((quiz)=>quiz.qId!=qId);
            Swal.fire('Success','quiz deleted','success');
          },
          (error)=>{
            Swal.fire('error','error while deleting','error');
        
          }
        );

      }
    })
    
    
  }
}


