import { AuthService } from './../_services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model :  any = {};
  //passing data to parenet component/home component
  @Output() cancelRegister =  new EventEmitter();

  constructor(private _authService : AuthService) { }

  ngOnInit() {
  }

  register()
  {
    //console.log(this.model);
    this._authService.register(this.model).subscribe(data => {
      console.log("successfully registered");
    }, error =>{
      console.log(error);
    });
  }

  cancel()
  {
    this.cancelRegister.emit(false);
    console.log('cancelled!');
  }

}
