import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<Boolean>();

  constructor(private http:HttpClient) { }


  //current user : which is login in 
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`)
  }

  //generate token 

  public generateToken(loginData: any)
  {

    return this.http.post(`${baseUrl}/generate-token`,loginData)
  
  }

  //login User function : set token to local storage 
  public loginUser(token:any)
  {
    localStorage.setItem('token',token)
   //this.loginStatusSubject.next(true);
    return true;
  }

  //islogin or not  user is login or not 
  public isLoggedIn()
  {
    let tokenStr=localStorage.getItem('token')
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null){
      return false;
    }else{
      return true;
    }
  }

  //log out : remove token from local storage
  public logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return true;
  }

  //getToken : return token form local storage
  public getToken(){
    return localStorage.getItem('token');
  }

  //set user details 
  public setUser(user: any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  //get user
  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  //get user role check Authority
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }


}
