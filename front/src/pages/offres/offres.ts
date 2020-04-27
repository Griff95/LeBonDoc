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

  userProfile: UserProfile;

  mostRecent: Ad[];
  sameSpeciality: Ad[];
  searchResultList: Ad[];
  filtersApplied = {
    medicalField: null,
    postalCode: null,
    adType: null,
    structureType: null
  };
  private displayResults: boolean;

  private mostRecentSubscription: Subscription;
  private sameSpeSubscription: Subscription;
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
    this.userProfilSubscription = this.accountService.userProfil$.subscribe((profile  ) => {
      this.userProfile = profile;
      if (this.userProfile.medicalField) {
        this.adService.getAdsSameMedicalField(this.userProfile.medicalField);
      }
    });
    this.adService.getAdsMostRecent();
    this.accountService.getAccount(this.authService.getUserId());
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
    modal.onDidDismiss(() => this.ngOnInit());
  }

  ngOnDestroy(){
    this.mostRecentSubscription.unsubscribe();
    this.userProfilSubscription.unsubscribe();
    this.sameSpeSubscription.unsubscribe();
  }
}
