import {UserProfil} from "../models/UserProfil";
import {Subject} from "rxjs";
import {Offre} from "../models/Offre";
import * as firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;

export class MoncompteService {

  userProfil: UserProfil;

  userProfil$ = new Subject<UserProfil>();

  addUserProfile(userProfil: UserProfil){
    this.userProfil= userProfil;
  }

  emitUserProfil(){
    this.userProfil$.next(this.userProfil)
  }

  saveData(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('userProfil').set(this.userProfil).then(
        (data: DataSnapshot) => {
          resolve(data);
        })
        .catch(
          (error) => {
            reject(error);
          }
        );
    });
  }

  retrieveData(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('userProfil').once('value').then(
        (data: DataSnapshot) => {
          this.userProfil = data.val();
          this.emitUserProfil();
          resolve('Données récuprées avec succès !')
        })
        .catch(
          (error) => {
            reject(error);
          }
        );
    });
  }


}
