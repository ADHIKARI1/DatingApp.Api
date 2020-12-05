import { AuthService } from './../../_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/User';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm') editForm: NgForm;
  constructor(
    private route: ActivatedRoute, 
    private alertify: AlertifyService, 
    private userSvc : UserService, 
    private auth: AuthService
    ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser()
  {
      this.userSvc.updateUser(this.auth.decodeToken.nameid, this.user).subscribe(next =>{
      this.alertify.success('Profile updated successfully!');
      this.editForm.reset(this.user);
     }, error =>{
       
       this.alertify.error(error);
     });    
  }

}
