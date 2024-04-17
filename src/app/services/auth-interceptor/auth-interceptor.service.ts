import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse) =>{
        let errorMessage = "Unknown error occurred";
        if(error.error instanceof ErrorEvent){
          errorMessage = `Error: ${error.error.message}`
        }else{
          errorMessage = `Error: ${error.message}`
        }

        return throwError(error)
      })
    )
  }

  constructor() { }
}
