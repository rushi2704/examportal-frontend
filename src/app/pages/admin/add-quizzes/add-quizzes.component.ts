import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizzService } from '../../../services/quizz.service';
import { error } from 'console';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrl: './add-quizzes.component.css'
})
export class AddQuizzesComponent implements OnInit {
  
  categories=[
    {
      cid:'',
      title:''
    }
  ];

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberQuestions:'',
    active:true,
    category:{
      cid:'',
    },
  };
  
  constructor(private _categories:CategoryService,private _snack:MatSnackBar,private _quiz:QuizzService){}

  ngOnInit(): void {

    this._categories.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !','Error in loading data from serve','error');
      }
    );

    
  }


  // add quiuzz funstion

  addQuiz()
  {
    if(this.quizData.title.trim()=='' || this.quizData.title.trim()==null)
    {
      this._snack.open("Title Required !!",'',{
        duration: 3000,
      });
      return;
    }

    // validation

    // server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        Swal.fire('Success','Quizz is added','success');   
       this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberQuestions:'',
          active:true,
          category:{
            cid:'',
          },
        };
      },
    (error)=>{
      Swal.fire('Error !!','Error while adding quiz','error');
      console.log(error);
    });
  
  }
}
