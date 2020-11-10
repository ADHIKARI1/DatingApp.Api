import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Observable} from 'rxjs/observable';
import { EmptyError, Observable, throwError } from "rxjs";  
import { map , catchError} from 'rxjs/operators';



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
    const http$ = this.http.post(url, model, { headers: this.setHeaders() });
    /*http$.subscribe(
      () =>{},
      err => { this.handleError(err) }); */ 
    return http$;
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
