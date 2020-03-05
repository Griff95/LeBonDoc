import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController, ModalController, ToastController} from 'ionic-angular';
import { DeposerFormPage } from './deposer-form/deposer-form';
import {OffresService} from "../../services/offres.service";
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {Ad} from "../../models/Ad";
import {OffreSimplePage} from "../offres/offre-simple/offre-simple";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";



@Component({
  selector: 'page-deposer',
  templateUrl: 'deposer.html'
})
export class DeposerPage {

  offresList: Ad[];
  userOffreListe: Ad[]=[];
  offreSubscription: Subscription;

  constructor(private authService: AuthService, private loadingCtrl: LoadingController, private modalCtrl: ModalController, private offresService: OffresService, private toastCtrl: ToastController, public navCtrl: NavController) {

  }

  ngOnInit(){
    this.onFetchList();
    this.offreSubscription = this.offresService.offres$.subscribe(
      (offres: Ad[]) => {
        this.offresList = offres;
      }
    );
    this.offresService.emitOffres();
    this.userOffreList();
  }

  ajouterOffre() {

    this.navCtrl.push(DeposerFormPage);
}

  onLoadOffre(offre: Ad) {
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
    }


  }

  ngOnDestroy(){
    this.offreSubscription.unsubscribe();
  }


}
