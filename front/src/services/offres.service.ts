import {Offre} from "../models/Offre";
import {Subject} from "rxjs";

import * as firebase from "firebase";
import {Specialite} from "../models/Specialite";
import {Candidature} from "../models/Candidature";
import {OffreType} from "../models/OffreType";
import DataSnapshot = firebase.database.DataSnapshot;
import {getUserConfigFile} from "@ionic/app-scripts";

export class OffresService{

  offres$ = new Subject<Offre[]>();
  searchResult$ = new Subject<Offre[]>();
  mostRecent$ = new Subject<Offre[]>();
  sameSpeciality$ = new Subject<Offre[]>();

  offresList: Offre[] = [];
  results: Offre[] = [];
  recents : Offre[] = [];
  same : Offre[] = [];

  addOffre(offre) {
    this.offresList.push(offre);
    this.emitOffres();
  }

  emitOffres(){
    this.offres$.next(this.offresList.slice());
  }

  emitSearchResults(){
    this.searchResult$.next(this.results.slice());
  }

  emitMostRecents(){
    this.mostRecent$.next(this.recents.slice());
  }

  emitSameSpeciality(){
    this.sameSpeciality$.next(this.same.slice());
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
          this.offresList = this.snapshotToArray(data);
          this.emitOffres();
          resolve('Données récupérées avec succès !')
        })
        .catch(
          (error) => {
            reject(error);
          }
        );
    });
  }

  retrieveMostRecents(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('offres').orderByChild("datePublication").once('value').then(
        (data: DataSnapshot) => {
          this.recents = this.snapshotToArray(data);
          this.emitMostRecents();
          resolve('Données récupérées avec succès !')
        })
        .catch(
          (error) => {
            reject(error);
          }
        );
    });
  }

  retrieveSameSpeciality(specialite: Specialite){
    return new Promise((resolve, reject) => {
      firebase.database().ref('offres').orderByChild("speciality").equalTo(specialite).once('value').then(
        (data: DataSnapshot) => {
          this.same = this.snapshotToArray(data);
          this.emitSameSpeciality();
          resolve('Données récupérées avec succès !')
        })
        .catch(
          (error) => {
            reject(error);
          }
        );
    });
  }

  search(searchFilters: { codePostal: number; dateSearch: Date; specialite: Specialite }) {
    if (searchFilters.specialite) {
      return new Promise((resolve, reject) => {
        firebase.database().ref('offres').orderByChild("specialite").equalTo(searchFilters.specialite).once('value').then(
          (data: DataSnapshot) => {
            console.log("offre service results : "+ data.key + " " + data.toJSON() + "  " + data.numChildren());
            this.results = this.snapshotToArray(data);
            console.log(this.results);
            this.emitSearchResults();
            resolve('Données récupérées avec succès !')
          })
          .catch(
            (error) => {
              reject(error);
            }
          );
      });
    }
  }

  snapshotToArray = snapshot => {
    let returnArray = [];
    snapshot.forEach( element => {
      let item = element.val();
      item.key = element.key;
      returnArray.push(item);
    })
    return returnArray;
  }
}

