import {Offre} from "../models/Offre";
import {Subject} from "rxjs";

export class OffresService{

  offres$ = new Subject<Offre[]>()

  offresList: Offre[] = [
    {
      name: 'Test generaliste',
      lieux: 'Corse',
      description: [
        'Nous recherchons un medecin generaliste disponible afin de remplacer un medecin'
      ],
      isFav: false
    },
    {
      name: 'Dentiste',
      lieux: 'Toulouse',
      description: [
        'Nous recherchons un dentiste pour remplacer un depart a la retraite'
      ],
      isFav: false
    },
    {
      name: 'Psychologue',
      lieux: 'Toulouse',
      description: [
        'Nous recherchons un Psychologue pour rejoindre l équipe de l hopital XXX'
      ],
      isFav: false
    }
  ];

  addOffre(offre: Offre) {
    this.offresList.push(offre);
    this.emitOffres();
  }

  emitOffres() {
    this.offres$.next(this.offresList.slice());
  }



}

