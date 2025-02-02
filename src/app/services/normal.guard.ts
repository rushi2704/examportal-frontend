import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root'
})
export class NormalGuard implements CanActivate{


    constructor(private login:LoginService, private router: Router){

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean |UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
        
        if(this.login.isLoggedIn() && this.login.getUserRole()=='NORMAL')
        {
            return true;
        }

        // if(this.login.isLoggedIn() && this.login.getUserRole()=='NORMAL')
        // {
        //     return true;
        // }

        this.router.navigate(['login'])
        
        return false;
      }
}