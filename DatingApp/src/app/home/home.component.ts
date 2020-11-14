import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerMode : boolean = false;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  registerToggle()  
  {
    this.registerMode = true;
  }

  CancelRegisterMode( registerMode :  boolean)
  {
    this.registerMode = registerMode;
  }

  loggedIn() : any
  {   
    return this._authService.loggedIn();
  }

}
