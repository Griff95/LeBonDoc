import {UserProfile } from "../models/UserProfile";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AccountService {

  userProfil: UserProfile;
  userProfil$ = new Subject<UserProfile>();

  constructor(private http: HttpClient,
              private authService : AuthService) {
  }


  emitUserProfil(){
    this.userProfil$.next(this.userProfil);
  }

  editProfile(userProfile: UserProfile){
      return new Promise((resolve, reject) => {
          let u = JSON.stringify(userProfile);
          this.http.put("http://localhost:3000/api/auth/", u, {headers : { "Content-Type": "application/json" }}).subscribe(
              (data) => {
                  resolve(data);
              },
              (error) => {
                  reject(error);
              }
          )
      });
  }

  getAccount(id: string){
      return new Promise((resolve, reject) => {
          this.http.get<UserProfile>("http://localhost:3000/api/auth/"+ id).subscribe(
              (data) => {
                  this.userProfil = data;
                  this.emitUserProfil();
                  resolve(data);
              },
              (error) => {
                  reject(error);
              }
          )
      });
  }
}
