import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

baseUrl = 'https://localhost:5001/api/auth/';
userToken : any;
user : any;

constructor(private http: HttpClient) { }
  
private setHeaders(): HttpHeaders {
  const headersConfig = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    //'Authorization': 'sdsdsudd85ffs65sf6sfdsd2sd5sd5whfweffgfaagg'
  };
  /*if (this.jwtService.getToken()) {
    headersConfig['Authorization'] = this.jwtService.getToken();
  }*/
  return new HttpHeaders(headersConfig);
}

  login(model : any)
  {      
      const url = this.baseUrl+'login'; 
      return this.http.post(url, model, { headers: this.setHeaders() }).pipe(map(response => {
        this.user = response;
        if(this.user)
        {
          localStorage.setItem('token', this.user.tokenString);
          this.userToken = this.user.tokenString;
        }
      }));
  }

  register(model : any)
  {
    const url = this.baseUrl+'register'; 
    return this.http.post(url, model, { headers: this.setHeaders() });
  }



}
