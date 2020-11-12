import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Observable} from 'rxjs/observable';
import { EmptyError, Observable, throwError } from "rxjs";  
import { map , catchError} from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

export function tokenGetter(access_token : string) {
  return localStorage.getItem(access_token);
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

baseUrl = 'https://localhost:5001/api/auth/';
userToken : any;
user : any;
decodeToken : any;
//jwtHelper = new JwtHelperService();


constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }
  
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
          this.decodeToken = this.jwtHelper.decodeToken(this.user.tokenString);
          console.log(this.decodeToken);
          this.userToken = this.user.tokenString;
        }
      }));
  }

  register(model : any)
  {
    const url = this.baseUrl+'register';    
    const http$ = this.http.post(url, model, { headers: this.setHeaders() });
    /*http$.subscribe(
      () =>{},
      err => { this.handleError(err) }); */ 
    return http$;
  }

loggedIn()
{  
  return this.tokenNotExpired('token');
}

private tokenNotExpired(token : string)
{
  const item: string = tokenGetter(token);
  return item != null && !this.jwtHelper.isTokenExpired(item);
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
          modelStateError += value[0]+'\n';
        }      
        console.log(modelStateError);
      }
     // return throwError(modelStateError || 'Server Error');
}


}
