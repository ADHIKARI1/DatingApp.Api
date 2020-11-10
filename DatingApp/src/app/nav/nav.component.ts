import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private _authService: AuthService, private _aleritify: AlertifyService) { }

  ngOnInit() {
  }
  login(){
    //console.log(this.model);
    this._authService.login(this.model).subscribe(data =>{
      this._aleritify.success('Logged in successfully');
    }, error => {
      this.handleError(error);
    });
  }

  logout()
  {
    this._authService.userToken = null;
    localStorage.removeItem('token');
    this._aleritify.message('logged out');
  }

  loggedIn() : any
  {
    const token =  localStorage.getItem('token');
    //use double not -  to type cast to boolean while using it
    return !!token
  }

  private handleError(err : any){  
    const serverError =  err;     
    let modelStateError = '';  
    if (serverError.error instanceof ErrorEvent)
    {
      modelStateError += 'Error'+serverError.header.get('Application-Error');
    }
    else
    {
      for (let [key, value] of Object.entries(serverError.error.errors)) {        
        modelStateError += value[0]+'\n';
      }      
      this._aleritify.error(modelStateError);      
    }   
}

}
