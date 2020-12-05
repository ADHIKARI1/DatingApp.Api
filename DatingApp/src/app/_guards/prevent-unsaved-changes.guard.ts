import { MemberEditComponent } from './../members/member-edit/member-edit.component';
import { Injectable } from '@angular/core';
import {  Router, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> { 
  constructor(private _authService: AuthService, private _aleritify: AlertifyService, private router: Router) {   }
    canDeactivate(component: MemberEditComponent){
        if(component.editForm.dirty)
            return confirm('Are you sure you want to continue?Any unsaved changes will be lost.');
        return true;
    }
    //canActivate(component : MemberEditComponent){     }  
}
