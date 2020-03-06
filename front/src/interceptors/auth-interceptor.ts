import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.auth.token) {
      const authToken = this.auth.token;
      let user = { userId: this.auth.getUserId() };
      const newRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken),
        body: { ...JSON.parse(req.body), ...user }
      });
      return next.handle(newRequest);
    } else {
      return next.handle(req);
    }
  }
}