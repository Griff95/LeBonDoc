import {UserProfile, UserProfilAdapter} from "../models/UserProfile";
import {Subject} from "rxjs";
import * as firebase from "firebase";
import {Specialite} from "../models/Specialite";
import DataSnapshot = firebase.database.DataSnapshot;
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AccountService {

  userProfil: UserProfile;
  userProfil$ = new Subject<UserProfile>();

  constructor(private http: HttpClient,
              private userProfilAdapter: UserProfilAdapter,
              private authService : AuthService) {
  }


  emitUserProfil(){
    this.userProfil$.next(this.userProfil)
  }

  editProfile(userProfile: UserProfile){

  }

  getAccount(id: string){
      console.log("id is " + id);
      return new Promise((resolve, reject) => {
      this.http.get<UserProfile>("http://localhost:3000/api/auth/"+ id).subscribe(
          (data) => {
              console.log("Voici les données");
              console.log(data);
              resolve(data);
      },
      (error) => {
              reject(error);
      }
    )
    });
  }
}
