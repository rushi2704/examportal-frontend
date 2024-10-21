import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  // registerForm!:FormGroup;
  // submitted= false;
  constructor(private userService:UserService,private snak:MatSnackBar) {}
    


public user={
  userName: '',
  firstName:'',
  lastName: '',
  password: '',
  email: '',
  phone: '',


};

  ngOnInit() {
  //   this.registerForm = this.formBuilder.group({
  //   //  firstName: ['', Validators.required],
  //     // lastName: ['', Validators.required],
  //     // email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  //     // password: ['', [Validators.required, Validators.minLength(6)]]
  // });
  }

  formSubmit()
  {
   // this.submitted=true;
    // to show user details on console
    console.log(this.user);

  //   if (this.registerForm.invalid) {
  //     return;
  // }

    if(this.user.userName=='' || this.user.userName==null){
      //alert('user is required !!')
      this.snak.open("User name is required !!",'',{
        duration:3000,
      });
      return;
    }

    // addUser : userService 

    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        // success
        console.log(data);
       // alert('succes');
      //  this.snak.open('success','',{
      //   duration:3000,
      //  })
      Swal.fire('Success','User id is '+data.id,'success');
      },
      (error)=>{
        //error
        console.log(error);
        //alert('something went wrong');
        this.snak.open('User is already in Db with this username!!','',{
          duration:3000,
        })
      }
    )
  }
}
