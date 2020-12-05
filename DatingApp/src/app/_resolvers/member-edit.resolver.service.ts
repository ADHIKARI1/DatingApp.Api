import { AuthService } from './../_services/auth.service';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../_models/User';
import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';


@Injectable({
  providedIn: 'root'
})
export class MemberEditResolver implements Resolve<User> {
constructor(private _user: UserService, private _auth: AuthService, private _aleritify: AlertifyService, private _router: Router  ) { }
  
resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<User> {   
    return this._user.getUser(this._auth.decodeToken.nameid).pipe(
      map(res => res),
      catchError(error =>{
        this._aleritify.error('Problem in retrieving data!');
        this._router.navigate(['/home']);
        return throwError(error);        
      })
    )    
}
}
