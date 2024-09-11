import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate{


    constructor(private login:LoginService, private router: Router){

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean> | Promise<boolean> | boolean {
        
        if(this.login.isLoggedIn() && this.login.getUserRole()=='ADMIN')
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