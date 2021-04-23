 
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { take, exhaustMap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.auth.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) return next.handle(req);
        const modifiedReq = req.clone(
          { headers: new HttpHeaders(`Authorization: Bearer ${user.token}`) },
        );
        return next.handle(modifiedReq).pipe(
          catchError((error) => {
            console.log('error is intercept')
            console.error(error);
            return throwError(error.message);
          })
        );
      }),
    );
  }
}
