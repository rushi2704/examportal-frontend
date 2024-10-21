import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent  implements OnInit{
  ngOnInit(): void {
   
  }

  disableRightClick(event: MouseEvent) {
    event.preventDefault();
  }
}
