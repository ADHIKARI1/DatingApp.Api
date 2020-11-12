import { AuthService, tokenGetter } from './_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { setTheme } from 'ngx-bootstrap/utils'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'DatingApp';  
  
  constructor(private _authService : AuthService, private jwtHelper: JwtHelperService) {
    setTheme('bs3');
   }

  ngOnInit()
  {
    const token = tokenGetter('token');
    if (token) {
      this._authService.decodeToken = this.jwtHelper.decodeToken(token);
    }
  }
}
