import { Component, OnInit } from '@angular/core';

import { NgxUiLoaderService, SPINNER } from "ngx-ui-loader"; // Import NgxUiLoaderService
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  
  title = 'frontexam';

  constructor(private ngxService: NgxUiLoaderService){}

  ngOnInit(): void {
    
    
   

   

  }
}
