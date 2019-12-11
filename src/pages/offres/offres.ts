import {Component, OnDestroy, OnInit} from '@angular/core';
import { ModalController } from 'ionic-angular';
import { OffreSimplePage } from './offre-simple/offre-simple';
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

  constructor(private modalCtrl: ModalController,private offresService: OffresService) {

  }

  ngOnInit(){
    this.offreSubscription = this.offresService.offres$.subscribe(
      (offres: Offre[]) => {
        this.offresList = offres;
    }
    );
    this.offresService.emitOffres();
  }

  onLoadOffre(offre: {name: string, description: string[], lieux: string}) {
    let modal = this.modalCtrl.create(OffreSimplePage, {offre: offre});
    modal.present();
  }
  ngOnDestroy(){
    this.offresService.offres$.unsubscribe();
  }
}
