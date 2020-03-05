import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController, ModalController, ToastController} from 'ionic-angular';
import {OffreSimplePage} from './offre-simple/offre-simple';
import {SearchPage} from './search/search';
import {Ad} from "../../models/Ad";
import {OffresService} from "../../services/offres.service";
import {Subscription} from "rxjs";
import {Specialite} from "../../models/Specialite";
import {AccountService} from "../../services/account.service";
import {UserProfile} from "../../models/UserProfile";

@Component({
  selector: 'page-offres',
  templateUrl: 'offres.html'
})
export class OffresPage implements OnInit, OnDestroy{

  userProfil: UserProfile;

  offresList: Ad[];
  mostRecent: Ad[];
  sameSpeciality: Ad[];
  searchResultList: Ad[];
  filtersApplied: string[] = [] ;
  private displayResults: boolean;

  //private offreSubscription: Subscription;
  private mostRecentSubscription: Subscription;
  private sameSpeSubscription: Subscription;
  private searchResultSubscription: Subscription;
  private userProfilSubscription: Subscription;

  constructor(private modalCtrl: ModalController,
              private offresService: OffresService,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private accountService: AccountService) {
    this.displayResults = false;
  }

  ngOnInit(){
    //this.onFetchList();
    /*this.offreSubscription = this.offresService.offres$.subscribe(
      (offres: Ad[]) => {
        this.offresList = offres;
      });*/
    this.mostRecentSubscription = this.offresService.mostRecent$.subscribe(
      (offres: Ad[]) => {
        this.mostRecent = offres;
      });
    this.sameSpeSubscription = this.offresService.sameSpeciality$.subscribe(
      (offres: Ad[]) => {
        this.sameSpeciality = offres;
      });
    this.searchResultSubscription = this.offresService.searchResult$.subscribe(
      (results: Ad[]) => {
        console.log("results : " + results);
        this.searchResultList = results;
      });
    this.userProfilSubscription = this.accountService.userProfil$.subscribe(
      (userProfil  ) => {
        this.userProfil = userProfil;
      });
    this.offresService.retrieveMostRecents();
    this.offresService.retrieveSameSpeciality(Specialite.Infirmier);


    /*this.accountService.retrieveData().then( () => {
      console.log(this.userProfil.specialite + "  " + this.userProfil.email);
    });*/
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
        console.log("ici");
        this.resetSearch();
      }
    });
    modal.present();
  }

  onLoadOffre(offre: Ad) {
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
    this.mostRecentSubscription.unsubscribe();
    this.searchResultSubscription.unsubscribe();
    //this.offreSubscription.unsubscribe();
    this.userProfilSubscription.unsubscribe();
    this.sameSpeSubscription.unsubscribe();
  }

}
