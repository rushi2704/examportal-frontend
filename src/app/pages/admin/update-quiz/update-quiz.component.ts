import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzService } from '../../../services/quizz.service';
import { CategoryService } from '../../../services/category.service';
import { error } from 'console';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit{
 

  constructor(private _route:ActivatedRoute,
    private _quiz:QuizzService,
    private _cat:CategoryService,
    private _router:Router){}
  
  categories:any;

  qId=0;
  quiz:any;

  ngOnInit(): void {
   this.qId= this._route.snapshot.params['qid'];

   this._quiz.getQuiz(this.qId).subscribe(
    (data:any)=>{
      this.quiz=data;
      console.log(this.quiz);
    },
    (error:any)=>{
      console.log(error)  
    }
   );

   this._cat.categories().subscribe((data:any)=>{
    this.categories=data;
   },error=>{
    alert("error in loading categories");
   }
  );

  // update from submit 



  }
  public updateData()
  {
   
    /// validation
    this._quiz.updateQuiz(this.quiz).subscribe((data)=>{
       Swal.fire('Success','Update Success','success').then((e)=>{
        this._router.navigate(['/admin/view-quizzes']);
       });
    },(error)=>{
      Swal.fire('error','error in updating quiz ','error');
    }); 
  }
}
