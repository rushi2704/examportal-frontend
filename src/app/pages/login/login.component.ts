import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
   password:'' 
  };

  constructor(private snack:MatSnackBar,private  login:LoginService, private router:Router){}

  ngOnInit(): void {  }
  

  formSubmit(){
    console.log('login clicked');

    if(this.loginData.username.trim()=='' || this.loginData.username==null)
    {
      this.snack.open("username is required !",'',{
        duration:3000,
      });
      return;

    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null)
      {
        this.snack.open("password is required !",'',{
          duration:3000,
        });
        return;
  
      }

      // request to server to generate the token 
      this.login.generateToken(this.loginData).subscribe(
        (data:any)=>{
          console.log("success");
          console.log(data);

          // login 
          this.login.loginUser(data.token);

          this.login.getCurrentUser().subscribe((user: any)=>{
            this.login.setUser(user);
            console.log(user);



           

          if(this.login.getUserRole()=='ADMIN'){
                // redirect ... ADMIN : admin-dashboard 
               // window.location.href='/admin';
             this.router.navigate(['admin']);
             this.login.loginStatusSubject.next(true);

          }else if (this.login.getUserRole()=='NORMAL'){
                // redirect ... NORAML : noarmal dashboard 
                 //window.location.href='/user-dashboard';
                this.router.navigate(['user-dashboard/0']);
                this.login.loginStatusSubject.next(true);

          }else{
            this.login.logout();
          }
           
          });

        },
      (error)=>{
        console.log("error !");
        console.log(error);
        this.snack.open('invalid details ! try again','',{
          duration:3000,
        });
      }
      );

  }

}
