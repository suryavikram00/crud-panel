import { Injectable, Injector } from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import { throwError } from 'rxjs';
import { LoadingService } from '../service/loading.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService {
  constructor(public injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show(); // Show progress bar when request starts
    let localStorageUtils = this.injector.get(LocalStorageService);
    let jwtToken = localStorageUtils.getJwtToken();
    if (jwtToken == null) {
      jwtToken = "dummytoken";
    }
    console.log(JSON.stringify(request));
    request = request.clone({
      headers: new HttpHeaders({
        token: jwtToken
      })
    })

    console.log('Intercepted HTTP call', request);
    return next.handle(request)
      .pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && ~~(event.status / 100) > 3) {
          console.info('HttpResponse::event =', event, ';');
        } else console.info('event =', event, ';');
        return event;
      })).pipe(
        catchError(this.handleError<any>('addHero')))
      .pipe(
        finalize(() => {
          this.loadingService.hide(); // Hide progress bar when request completes
        })
      )
      ;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // log to console instead
      if (error instanceof HttpErrorResponse) {
        if (error.status === 403) {
          console.info('err.error.403 =', error.error.error, ';');
          console.info('err.error =', error, ';');
          error.error.error = "User is not authorized to perform this action";
        }
        else if (error.status === 401) {
          console.info('err.error.401 =', error.error.error, ';');
          let localStorageUtils = this.injector.get(LocalStorageService);
          localStorageUtils.clearJwtToken();
          this.router.navigate(['login']);
        }
        return throwError(error);
      }

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };

  }
}
