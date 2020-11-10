import { AuthService } from './../_services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model :  any = {};
  //passing data to parenet component/home component
  @Output() cancelRegister =  new EventEmitter();

  constructor(private _authService : AuthService, private _aleritify: AlertifyService) { }

  ngOnInit() {
  }

  register()
  {
    //console.log(this.model);
    this._authService.register(this.model).subscribe(data => {
      this._aleritify.success("successfully registered");
    }, error =>{      
      this.handleError(error);   
    });
  }

  cancel()
  {
    this.cancelRegister.emit(false);
    //this._aleritify.message('cancelled!');
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
        modelStateError += value[0]+'\n'+'<br/>';
      }      
      //console.log(modelStateError);
      this._aleritify.error(modelStateError);    
    }   
}

}
