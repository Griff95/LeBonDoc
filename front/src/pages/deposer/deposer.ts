import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController, ModalController, ToastController} from 'ionic-angular';
import { DeposerFormPage } from './deposer-form/deposer-form';
import {OffresService} from "../../services/offres.service";
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {Offre} from "../../models/Offre";
import {OffreSimplePage} from "../offres/offre-simple/offre-simple";
import {Subscription} from "rxjs";
import {ConnexionService} from "../../services/connexion.service";



@Component({
  selector: 'page-deposer',
  templateUrl: 'deposer.html'
})
export class DeposerPage {

  offresList: Offre[];
  userOffreListe: Offre[]=[];
  offreSubscription: Subscription;

  constructor(private connexionService: ConnexionService,private loadingCtrl: LoadingController, private modalCtrl: ModalController,private offresService: OffresService, private toastCtrl: ToastController, public navCtrl: NavController) {

  }

  ngOnInit(){
    this.onFetchList();
    this.offreSubscription = this.offresService.offres$.subscribe(
      (offres: Offre[]) => {
        this.offresList = offres;
      }
    );
    this.offresService.emitOffres();
    this.userOffreList();
  }

  ajouterOffre() {

    this.navCtrl.push(DeposerFormPage);
}

  onLoadOffre(offre: Offre) {
    let modal = this.modalCtrl.create(OffreSimplePage, {offre: offre});
    modal.present();
  }

  onFetchList(){
    let loader = this.loadingCtrl.create({
      content: "Récupération en cours..."
    });
    loader.present();
    this.offresService.retrieveData()
      .then(
        ()=>{
          loader.dismiss();
          this.toastCtrl.create({
            message: "Données récupérées !",
            duration: 2000,
            position: "bottom"
          }).present();
        }
      ).catch(
      (error)=>{
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 1000,
          position: "bottom"
        }).present();
      }
    )

  }

  userOffreList(){
    for (let offre of this.offresList) {
      if (offre.id==this.connexionService.user.uid) {
        this.userOffreListe.push(offre)
      }
    }


    }


}
