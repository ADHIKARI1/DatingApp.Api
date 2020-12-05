import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { 
  constructor(private _authService: AuthService, private _aleritify: AlertifyService, private router: Router) {   }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this._authService.loggedIn())
      return true;
      
    this._aleritify.error('Please logging to access.');
    this.router.navigate(['/home']);
    return false;
  }  
}
