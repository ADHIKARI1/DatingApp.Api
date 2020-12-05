import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  users : User[];

  constructor(private _user: UserService, private _aleritify: AlertifyService, private _route: ActivatedRoute) { }

  ngOnInit() {
    //this.loadUsers();
    this.users = this._route.snapshot.data['users'];
  }
  
  loadUsers()
  {
    this._user.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      this.handleError(error);
    });
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
     /* if(serverError.error.status == 401)
        modelStateError += "username or password incorrect<br/> no user found!";
      else
        modelStateError += "Failed to login!";*/

      
      
      this._aleritify.error(modelStateError);      
    }   
}

}
