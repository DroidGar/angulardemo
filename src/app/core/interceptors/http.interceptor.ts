import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req: any, next): Observable<any> => {
    if (req.url === 'https://api.example.com/login') {
        if (req.body.email === 'user@demo.com' && req.body.password === '123456') {
            return of(new HttpResponse({status: 200, body: "eyxxxxxxxxxxx"}));
        }
      return of(new HttpErrorResponse({status: 401, error: {message: 'Invalid username or password'}}));
    }
    return next(req);
};
