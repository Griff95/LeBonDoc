import {Offre} from "../models/Offre";
import {Subject} from "rxjs";

import * as firebase from "firebase";
import {Specialite} from "../models/Specialite";
import {Candidature} from "../models/Candidature";
import {OffreType} from "../models/OffreType";
import DataSnapshot = firebase.database.DataSnapshot;
import {getUserConfigFile} from "@ionic/app-scripts";

export class OffresService{

  offres$ = new Subject<Offre[]>()

  offresList: Offre[] = [];

  addOffre(offre) {
    this.offresList.push(offre);
    this.emitOffres();
  }

  emitOffres() {
    this.offres$.next(this.offresList.slice());
  }

  saveData(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('offres').set(this.offresList).then(
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
      firebase.database().ref('offres').once('value').then(
        (data: DataSnapshot) => {
          this.offresList = data.val();
          this.emitOffres();
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

