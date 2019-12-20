import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController, ModalController, NavController, ToastController} from 'ionic-angular';
import { OffreSimplePage } from './offre-simple/offre-simple';
import { SearchPage } from './search/search';
import {Offre} from "../../models/Offre";
import {OffresService} from "../../services/offres.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'page-offres',
  templateUrl: 'offres.html'
})
export class OffresPage implements OnInit, OnDestroy{

  offresList: Offre[];
  offreSubscription: Subscription;

  constructor(private modalCtrl: ModalController,private offresService: OffresService, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private navCtrl : NavController) {

  }

  ngOnInit(){
    this.onFetchList();
    this.offreSubscription = this.offresService.offres$.subscribe(
      (offres: Offre[]) => {
        this.offresList = offres;
    }
    );
    this.offresService.emitOffres();
  }


  onSearch() {
    this.navCtrl.push(SearchPage);
  }


  onLoadOffre(offre: Offre) {
    let modal = this.modalCtrl.create(OffreSimplePage, {offre: offre});
    modal.present();
  }

  onSaveList(){
    let loader = this.loadingCtrl.create({
      content: "Sauvegarde en cours..."
    });
    loader.present();
    this.offresService.saveData().then(
      ()=>{
        loader.dismiss();
        this.toastCtrl.create({
          message: "Données sauvegardées !",
          duration: 3000,
          position: "bottom"
          }).present();
      }
    ).catch(
      (error)=>{
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: "bottom"
        }).present();
      }
    )
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

  doRefresh(event) {
    this.onFetchList();
    setTimeout(() => {
      //complete()  signify that the refreshing has completed and to close the refresher
    event.complete();
    }, 1000);
}

  ngOnDestroy(){
    this.offresService.offres$.unsubscribe();
  }

}
