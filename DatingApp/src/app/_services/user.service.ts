import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map , catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';
import { tokenGetter } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

private setHeaders(): HttpHeaders {
  let token = tokenGetter('token');
  const headersConfig = {
    'Authorization': 'Bearer '+token,
    'Content-Type': 'application/json',
    'Accept': 'application/json'    
  };  
  return new HttpHeaders(headersConfig);
}

getUsers(): Observable<User[]>{
  return this.http.get(this.baseUrl+'users', { headers: this.setHeaders() })
  .pipe(
    map(response => <User[]>response)
  );
}

getUser(id): Observable<User>{
  //console.log(id);
  return this.http.get(this.baseUrl+'users/'+id, { headers: this.setHeaders() })
  .pipe(
    map(response => <User>response)
  );
}

updateUser(id: number, user: User)
{
  return this.http.put(this.baseUrl+'users/'+id, user, { headers: this.setHeaders() });
}

}
