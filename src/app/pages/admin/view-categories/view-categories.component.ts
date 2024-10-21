import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { log } from 'console';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent implements OnInit{
  

  categories=[
    { cid: 1, title: 'Technology', description: 'All things tech-related.' },
    { cid: 2, title: 'Health', description: 'Wellness and healthcare news.' },
    { cid: 3, title: 'Business', description: 'Business and entrepreneurship.' },
  ];

  constructor(private _category:CategoryService){}

  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
       //css
       this.categories=data;
       console.log(this.categories);
    },
  (error)=>{
    //
   console.log(error)
   Swal.fire("Error !!","error in loading data",'error');
  });
  }

  deleteCategory(cid:any)
  {
    this._category.deleteCategory(cid).subscribe(
      (data:any)=>{
        this.categories=this.categories.filter((categoires)=>categoires.cid!=cid);
        Swal.fire('Success','quiz deleted','success');
      },
      (error)=>{
        Swal.fire('Error','Category contain quizzes','error');

      }
    )
  }


}
