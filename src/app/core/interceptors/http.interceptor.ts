import {HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
  if (req.url === 'https://api.example.com/login') {
    if (req.body.email === 'user@demo.com' && req.body.password === '123456') {
      return of(new HttpResponse({status: 200, body: "eyxxxxxxxxxxx"}));
    }
    return throwError(() => new HttpErrorResponse({status: 401, statusText: 'Unauthorized'}));
  }
  return next(req);
};
