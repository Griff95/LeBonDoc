import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { OffreSimplePage } from '../offres/offre-simple/offre-simple';
import {MoncompteService} from '../../services/moncompte.service';
import { UserProfil } from '../../models/UserProfil';
import {Subscription} from "rxjs";
import { Specialite } from '../../models/Specialite';
import { OffresFav } from '../favoris/offresfav';
import { Offre } from '../../models/Offre';


@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html'
})
export class FavorisPage {

 /*  userProfil: UserProfil;
  userProfilSubscription: Subscription; */  

  constructor(private modalCtrl: ModalController,public global: OffresFav) {
   }

/*    ngOnInit(){

        this.userProfil = 

          {
            userId:"thretgrgraffz",
            nom: "Bocquet",
            prenom: "Rémi",
            telephone: "0687702166",
            email: "bocquetrem@eisti.eu",
            dateDeNaissance: new Date(),
            isVerified: false,
            offres: [],
            favoris: [],
            specialite: Specialite.Dentiste,
            codePostal: 52000,
            unMotSurMoi: "C'est le jour 1"
          }
        ;
  

  } */


  onLoadOffre(offre: Offre) {
    let modal = this.modalCtrl.create(OffreSimplePage, {offre: offre});
    modal.present();
  }

}
