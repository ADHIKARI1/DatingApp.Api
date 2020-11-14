import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private _authService: AuthService, private _aleritify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }
  login(){
    //console.log(this.model);
    this._authService.login(this.model).subscribe(data =>{
      this._aleritify.success('Logged in successfully');
    }, error => {
      this.handleError(error);
    },()=>{
      this.router.navigate(['/members']);
    });
  }

  logout()
  {
    this._authService.userToken = null;
    localStorage.removeItem('token');
    this._aleritify.message('logged out');
    this.router.navigate(['/home']);
  }

  loggedIn() : any
  {
    //const token =  localStorage.getItem('token');
    //use double not -  to type cast to boolean while using it
    //return !!token
    return this._authService.loggedIn();
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
      if(serverError.error.errors != null)
      {
        for (let [key, value] of Object.entries(serverError.error.errors)) {        
          modelStateError += value[0]+'\n';
        }      
      }
      if(serverError.error.status == 401)
        modelStateError += "username or password incorrect<br/> no user found!";
      else
        modelStateError += "Failed to login!";

      
      
      this._aleritify.error(modelStateError);      
    }   
}

}
