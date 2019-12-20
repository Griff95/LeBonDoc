import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController, ModalController, NavController, ToastController} from 'ionic-angular';
import { OffreSimplePage } from './offre-simple/offre-simple';
import { SearchPage } from './search/search';
import {Offre} from "../../models/Offre";
import {OffresService} from "../../services/offres.service";
import {Subscription} from "rxjs";
import {Specialite} from "../../models/Specialite";
import {MoncompteService} from "../../services/moncompte.service";
import {UserProfil} from "../../models/UserProfil";

@Component({
  selector: 'page-offres',
  templateUrl: 'offres.html'
})
export class OffresPage implements OnInit, OnDestroy{

  userProfil: UserProfil;

  offresList: Offre[];
  mostRecent: Offre[];
  sameSpeciality: Offre[];
  searchResultList: Offre[];
  filtersApplied: string[] = [] ;
  private displayResults: boolean;

  private offreSubscription: Subscription;
  private mostRecentSubscription: Subscription;
  private sameSpeSubscription: Subscription;
  private searchResultSubscription: Subscription;
  private userProfilSubscription: Subscription;


  constructor(private modalCtrl: ModalController,private offresService: OffresService, private toastCtrl: ToastController, private loadingCtrl: LoadingController,   private moncompteService: MoncompteService) {
    this.displayResults = false;
  }

  ngOnInit(){
    //this.onFetchList();
    /*this.offreSubscription = this.offresService.offres$.subscribe(
      (offres: Offre[]) => {
        this.offresList = offres;
      });*/
    this.mostRecentSubscription = this.offresService.mostRecent$.subscribe(
      (offres: Offre[]) => {
        this.mostRecent = offres;
      });
    this.sameSpeSubscription = this.offresService.sameSpeciality$.subscribe(
      (offres: Offre[]) => {
        this.sameSpeciality = offres;
      });
    this.searchResultSubscription = this.offresService.searchResult$.subscribe(
      (results: Offre[]) => {
        console.log("results : " + results);
        this.searchResultList = results;
      });
    this.userProfilSubscription = this.moncompteService.userProfil$.subscribe(
      (userProfil  ) => {
        this.userProfil = userProfil;
      });
    this.moncompteService.retrieveData().then( () => {
      console.log(this.userProfil.specialite + "  " + this.userProfil.email);
      this.offresService.retrieveMostRecents();
      this.offresService.retrieveSameSpeciality(this.userProfil.specialite);
    });
  }
  resetSearch(){
    this.searchResultList = undefined;
    this.filtersApplied = [] ;
    this.displayResults = false;
  }

  onSearch() {
    let modal = this.modalCtrl.create(SearchPage);
    modal.onDidDismiss( data => {
      if (data) {
        this.displayResults = true;
        if (data.specialite) this.filtersApplied.push(data.specialite)
        if (data.dateSearch) this.filtersApplied.push(data.dateSearch)
        if (data.codePostal) this.filtersApplied.push(data.codePostal)
        console.log("searchFilters : " + data.specialite);
        this.offresService.search(data);
      } else {
        this.resetSearch();
      }
    });
    modal.present();
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
    this.offresService.searchResult$.unsubscribe();
    this.offresService.mostRecent$.unsubscribe();
    this.offresService.sameSpeciality$.unsubscribe();
  }

}
