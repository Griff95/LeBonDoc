import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {LoadingController, ModalController, ToastController} from 'ionic-angular';
import {OffreSimplePage} from './offre-simple/offre-simple';
import {SearchPage} from './search/search';
import {Ad} from "../../models/Ad";
import {AdService} from "../../services/ad.service";
import {Subscription} from "rxjs";
import {AccountService} from "../../services/account.service";
import {UserProfile} from "../../models/UserProfile";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'page-offres',
  templateUrl: 'offres.html'
})
export class OffresPage implements OnInit, OnDestroy{

  userProfil: UserProfile;

  mostRecent: Ad[];
  sameSpeciality: Ad[];
  searchResultList: Ad[];
  filtersApplied = {
    medicalField: null,
    postalCode: null,
    adType: null,
    structureType: null
  };
  public objectKeys = Object.keys;
  private displayResults: boolean;

  private mostRecentSubscription: Subscription;
  private sameSpeSubscription: Subscription;
  private searchResultSubscription: Subscription;
  private userProfilSubscription: Subscription;

  constructor(private modalCtrl: ModalController,
              private adService: AdService,
              private authService: AuthService,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private accountService: AccountService,
              private zone: NgZone) {
    this.displayResults = false;
  }

  ngOnInit(){
    this.mostRecentSubscription = this.adService.mostRecent$.subscribe(
        (mostRecentAds: Ad[]) => {
          this.zone.run(() => {
            this.mostRecent = mostRecentAds;
          });
        });
    this.sameSpeSubscription = this.adService.sameSpeciality$.subscribe(
        (sameMedicalFieldAds: Ad[]) => {
          this.zone.run(() => {
            this.sameSpeciality = sameMedicalFieldAds;
          });
        });
    // this.searchResultSubscription = this.adService.searchResult$.subscribe(
    //     (results: Ad[]) => {
    //       this.zone.run(() => {
    //         console.log("results : " + results);
    //         this.searchResultList = results;
    //       });
    //     });
    this.userProfilSubscription = this.accountService.userProfil$.subscribe(
        (userProfil  ) => {
          this.userProfil = userProfil;
        });
    this.adService.getAdsMostRecent().then( r => {}).catch((err) => console.log(err));

    this.accountService.getAccount(this.authService.getUserId()).then( r => {
      if (this.userProfil.medicalField)
        this.adService.getAdsSameMedicalField(this.userProfil.medicalField).then((r : Ad[]) => {
          this.zone.run(() => {
            this.sameSpeciality = r;
          });
        }).catch( (err) => console.log(err));
    })
  }


  resetSearch(){
    this.searchResultList = undefined;
    this.filtersApplied = {
      medicalField: null,
      postalCode: null,
      adType: null,
      structureType: null
    };
    this.displayResults = false;
  }

  onSearch() {
    let modal = this.modalCtrl.create(SearchPage, {filters: this.filtersApplied});
    modal.onDidDismiss( data => {
      if (data) {
        console.log(JSON.stringify(data));
        this.displayResults = true;
        if (data.medicalField) this.filtersApplied.medicalField = data.medicalField;
        if (data.adType) this.filtersApplied.adType = data.adType;
        if (data.postalCode) this.filtersApplied.postalCode = data.postalCode;
        if (data.structureType) this.filtersApplied.structureType = data.structureType;
        this.adService.search(JSON.stringify(this.filtersApplied)).then((ads : Ad[]) => {
          this.searchResultList = ads;
        }).catch((err) => console.log(err));
      } else {
        this.resetSearch();
      }
    });
    modal.present();
  }

  removeFilter(i){
    if (i == 0) delete this.filtersApplied.medicalField;
    if (i == 1) delete this.filtersApplied.postalCode;
    if (i == 2) delete this.filtersApplied.adType;
    if (i == 3) delete this.filtersApplied.structureType;
    if (this.filtersApplied.medicalField || this.filtersApplied.postalCode || this.filtersApplied.adType || this.filtersApplied.structureType) {
      this.adService.search(JSON.stringify(this.filtersApplied)).then((ads: Ad[]) => {
        this.searchResultList = ads;
      }).catch((err) => console.log(err));
    } else {
      this.resetSearch();
    }
  }

  onLoadOffre(offre: Ad) {
    let modal = this.modalCtrl.create(OffreSimplePage, {offre: offre});
    modal.present();
  }

  // onSaveList(){
  //   let loader = this.loadingCtrl.create({
  //     content: "Sauvegarde en cours..."
  //   });
  //   loader.present();
  //   this.adService.saveData().then(
  //       ()=>{
  //         loader.dismiss();
  //         this.toastCtrl.create({
  //           message: "Données sauvegardées !",
  //           duration: 3000,
  //           position: "bottom"
  //         }).present();
  //       }
  //   ).catch(
  //       (error)=>{
  //         loader.dismiss();
  //         this.toastCtrl.create({
  //           message: error,
  //           duration: 3000,
  //           position: "bottom"
  //         }).present();
  //       }
  //   )
  // }
  //
  // onFetchList(){
  //   let loader = this.loadingCtrl.create({
  //     content: "Récupération en cours..."
  //   });
  //   loader.present();
  //   this.adService.retrieveData()
  //       .then(
  //           ()=>{
  //             loader.dismiss();
  //             this.toastCtrl.create({
  //               message: "Données récupérées !",
  //               duration: 2000,
  //               position: "bottom"
  //             }).present();
  //           }
  //       ).catch(
  //       (error)=>{
  //         loader.dismiss();
  //         this.toastCtrl.create({
  //           message: error,
  //           duration: 1000,
  //           position: "bottom"
  //         }).present();
  //       }
  //   )
  //
  // }
  //
  // doRefresh(event) {
  //   this.onFetchList();
  //   setTimeout(() => {
  //     //complete()  signify that the refreshing has completed and to close the refresher
  //     event.complete();
  //   }, 1000);
  // }

  ngOnDestroy(){
    this.mostRecentSubscription.unsubscribe();
    // this.searchResultSubscription.unsubscribe();
    this.userProfilSubscription.unsubscribe();
    this.sameSpeSubscription.unsubscribe();
  }
}
