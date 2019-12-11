import {Offre} from "../models/Offre";
import {Subject} from "rxjs";

import * as firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;

export class OffresService{

  offres$ = new Subject<Offre[]>()

  offresList: Offre[] = [
    {
      name: 'Medecin generaliste',
      lieux: 'Corse',
      description: [
        'Nous recherchons un medecin generaliste disponible afin de remplacer un medecin'
      ],
      isFav: false,
      userId: 0,
      id : 0
    },
    {
      name: 'Dentiste',
      lieux: 'Toulouse',
      description: [
        'Nous recherchons un dentiste pour remplacer un depart a la retraite'
      ],
      isFav: false,
      userId: 1,
      id: 1
    },
    {
      name: 'Psychologue',
      lieux: 'Toulouse',
      description: [
        'Nous recherchons un Psychologue pour rejoindre l équipe de l hopital XXX'
      ],
      isFav: false,
      userId: 2,
      id: 2
    }
  ];

  addOffre(offre: Offre) {
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

