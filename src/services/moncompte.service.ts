import {UserProfil} from "../models/UserProfil";
import {Subject} from "rxjs";
import * as firebase from "firebase";
import {Specialite} from "../models/Specialite";
import DataSnapshot = firebase.database.DataSnapshot;

export class MoncompteService {

  private userProfilList: UserProfil[] = [{
    userId: null,
    nom: 'test',
    prenom: 'test',
    telephone: '01020405',
    email: 'test252545@gmail.fr',
    dateDeNaissance: new Date(),
    isVerified: false,
    specialite: Specialite.Chirurgien,
    codePostal: 95000,
    unMotSurMoi: 'test description',
    offres: [],
    favoris: []

  }];
  userProfilList$ = new Subject<UserProfil[]>();

  userProfil: UserProfil;
  userProfil$ = new Subject<UserProfil>();

  addUserProfile(userProfil: UserProfil){
    this.userProfilList.push(userProfil);
    this.emitUserProfilList()
  }

  emitUserProfilList(){
    this.userProfilList$.next(this.userProfilList.slice())
  }

  emitUserProfil(){
    this.userProfil$.next(this.userProfil)
  }

  saveData(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('userProfilsList').set(this.userProfilList).then(
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
      firebase.database().ref('userProfilsList').once('value').then(
        (data: DataSnapshot) => {
          this.userProfilList = data.val();
          this.emitUserProfilList();
          resolve('Données récuprées avec succès !')
        })
        .catch(
          (error) => {
            reject(error);
          }
        );
    });
  }

  userSelection(userId: String){
    for (let userProfile of this.userProfilList){
      if (userProfile.userId==userId){
        this.userProfil=userProfile;
      }
    }
  }
}
