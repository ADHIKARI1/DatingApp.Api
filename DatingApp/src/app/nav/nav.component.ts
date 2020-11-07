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
  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }
  login(){
    //console.log(this.model);
    this._authService.login(this.model).subscribe(data =>{
      console.log('Logged in successfully');
    }, error => {
      console.log('Failed to login');
    });
  }

  logout()
  {
    this._authService.userToken = null;
    localStorage.removeItem('token');
    console.log('logged out');
  }

  loggedIn() : any
  {
    const token =  localStorage.getItem('token');
    return !!token
  }

}
