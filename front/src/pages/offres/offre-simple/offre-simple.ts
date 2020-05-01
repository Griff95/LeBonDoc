import {Component, NgZone, OnInit} from '@angular/core';
import { NavParams, ViewController, ModalController, NavController } from 'ionic-angular';
import {Ad} from "../../../models/Ad";
import {AdChat} from "../../../models/AdChat";
import {UserProfile} from "../../../models/UserProfile";
import {AdService} from "../../../services/ad.service";
import {ChatService} from "../../../services/chat.service";
import {AccountService} from "../../../services/account.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {JsonService} from "../../../services/json.service";
import {ConversationComponent} from "../../../components/conversation/conversation";
import {MessagesPage} from "../../messages/messages";
import {TabsPage} from "../../tabs/tabs";



@Component({
  selector: 'page-offre-simple',
  templateUrl: 'offre-simple.html',
})
export class OffreSimplePage implements OnInit {

  userProfilSub : Subscription;
  userProfil: UserProfile;

  medicalField;
  adType;
  structureType;

  offre: Ad;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              private adService: AdService,
              private chatService: ChatService,
              private accountService: AccountService,
              private nav: NavController,
              private authService : AuthService,
              private zone: NgZone,
              private jsonService : JsonService,
              private modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.userProfilSub = this.accountService.userProfil$.subscribe((profile: UserProfile) => {
      this.zone.run(() => {
        this.userProfil = profile;
        const heart = document.getElementById('fav-heart');
        if (this.userProfil.favorites.indexOf(this.navParams.get('offre')._id) !== -1) {
          heart.setAttribute("style", "color:blue");
        } else {
          heart.setAttribute("style", "color:black");
        }
      });
    });
    this.accountService.getAccount(this.authService.getUserId());
    this.jsonService.getStructureTypes().then((data) => this.structureType = data);
    this.jsonService.getMedicalFields().then((data) => this.medicalField = data);
    this.jsonService.getAdTypes().then((data) => this.adType = data);
    this.adService.getAd(this.navParams.get('offre')._id).then((ad: Ad) => {
      this.offre = ad;
      console.log("found ad :");
      console.log(ad);
    });
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  favorites() {
    console.log(this.offre);
    const id = this.navParams.get('offre')._id;
    if (this.userProfil.favorites.indexOf(id) !== -1) {
      this.adService.removeFavorites(JSON.stringify({ id: id })).then(
          (data) => {
            this.accountService.getAccount(this.authService.getUserId());
            this.adService.getUserFavorites();
            console.log(data);
          }, (err) => {console.log(err.toString())}
      );
    } else {
      this.adService.addToFavorites(JSON.stringify({ id: id })).then(
          (data) => {
            this.accountService.getAccount(this.authService.getUserId());
            this.adService.getUserFavorites();
            console.log(data);
          }, (err) => {console.log(err.toString())}
      );
    }
  }

  deleteOffre(offre){
    this.adService.deleteAd(this.offre._id);
    this.viewCtrl.dismiss();

  }



  async contactOwner() {
    //let test = 0;
    this.dismissModal();
    this.chatService.startOrGetChat(this.offre._id).then( (chat) => {
      this.nav.setRoot(TabsPage, {tabIndex: 3});
      // this.nav.push(MessagesPage);
      console.log(chat);
      let modal = this.modalCtrl.create(ConversationComponent, {conv: chat});
      modal.present();
    });
  }

  ngOnDestroy(){
    this.userProfilSub.unsubscribe();
  }
}
