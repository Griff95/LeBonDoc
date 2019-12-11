import {Offre} from "../models/Offre";

export class OffresService{

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
}

