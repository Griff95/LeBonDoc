import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from "@angular/core";

@Injectable()
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string;
  userId: string;

  constructor(private http: HttpClient) {
  }

  signUp(data) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(
          'http://localhost:3000/api/auth/signup',
          data)
          .subscribe(
              () => {
                this.login(data.email, data.password).then(
                    () => {
                      resolve();
                    }
                ).catch(
                    (error) => {
                      reject(error);
                    }
                );
              },
              (error) => {
                reject(error);
              }
          );
    });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
          'http://localhost:3000/api/auth/login',
          { email: email, password: password })
          .subscribe(
              (authData: { token: string, userId: string }) => {
                this.token = authData.token;
                this.userId = authData.userId;
                this.isAuth$.next(true);
                resolve();
              },
              (error) => {
                reject(error);
              }
          );
    });
  }

  getUserId(){
      return this.userId;
  }

  logOut() {
    this.isAuth$.next(false);
    this.userId = null;
    this.token = null;
  }
}
