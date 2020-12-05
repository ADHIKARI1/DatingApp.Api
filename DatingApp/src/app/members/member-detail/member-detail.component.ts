import { User } from './../../_models/User';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  user : User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];


  constructor(private _user: UserService, private _aleritify: AlertifyService, private _route: ActivatedRoute) { }

  ngOnInit() : void {
    //this.loadUser();
    this._route.data.subscribe(data => {
      this.user = data['user'];     
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }      
    ];

    this.galleryImages =  this.getImages();
  
  }

  getImages(){
    const imageUrls = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small : this.user.photos[i].url,
        medium:this.user.photos[i].url,
        big: this.user.photos[i].url,
        description:this.user.photos[i].description
      });      
    }

    return imageUrls;
  }

  loadUser()
  {
    this._user.getUser(this._route.snapshot.params['id'])
    .subscribe((user: User) => {
      this.user = user;
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
