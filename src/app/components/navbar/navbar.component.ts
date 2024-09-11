import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user:any= null;

  constructor(public login: LoginService, private router:Router){

  }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user  = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn = this.login.isLoggedIn();
       this.user  = this.login.getUser();
     });
  }

  public logout(){
    this.login.logout();
     this.isLoggedIn = false;
     this.user = null;
    //window.location.reload();
    this.router.navigate(['/login']);
  }
}
