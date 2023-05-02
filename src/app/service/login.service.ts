import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl = environment.apiEndpoint+"/login";

  constructor(private http: HttpClient, private api: ApiService) { }

  login(user: any): Observable<any> {
    return this.api.httpPost("/login", user);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
