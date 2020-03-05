import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams, ToastController, Nav } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { UserProfile, UserProfilAdapter } from "../../models/UserProfile";
import { Subscription } from "rxjs";
import { AccountService } from "../../services/account.service";
import { HomePage } from '../home/home';
import {User} from "firebase";





@Component({
  selector: 'page-moncompte',
  templateUrl: 'moncompte.html'
})

export class MonComptePage implements OnInit, OnDestroy {

  errorMessage: string;
  userProfile: UserProfile;
  userProfilSubscription: Subscription;

  constructor(public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public navCtrl: NavController,
              private accountService: AccountService,
              private authService: AuthService) {
  }
  ngOnInit() {
    console.log("bonjour la galère");

    this.userProfilSubscription = this.accountService.userProfil$.subscribe(
        (user) => {
          this.userProfile = user;
          console.log(user);
        });

    this.accountService.getAccount(this.authService.getUserId()).then(
        (profile: UserProfile) => {
          this.userProfile = profile;
        }
    );
    console.log("on init ended");
  }

  // onEditProfile() {
  //   let loader = this.loadingCtrl.create({
  //     content: "Sauvegarde en cours..."
  //   });
  //   loader.present();
  //   this.accountService.editProfile(this.userProfile).then(
  //     () => {
  //       loader.dismiss();
  //       this.toastCtrl.create({
  //         message: "Données sauvegardées !",
  //         duration: 3000,
  //         position: "bottom"
  //       }).present();
  //     }
  //   ).catch(
  //     (error) => {
  //       loader.dismiss();
  //       this.toastCtrl.create({
  //         message: error,
  //         duration: 3000,
  //         position: "bottom"
  //       }).present();
  //     }
  //   )
  // }


/*
  onFetchUserProfil() {
    let loader = this.loadingCtrl.create({
      content: "Récupération en cours..."
    });
    loader.present();
    this.accountService.getAccount(this.authService.getUserId()).then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: "Données récupérées !",
          duration: 3000,
          position: "bottom"
        }).present();
      }
    ).catch(
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: "bottom"
        }).present();
      }
    )
  }
*/
  onDisconnect() {
    this.authService.logOut();
    this.navCtrl.parent.parent.setRoot(HomePage);
  }

  ngOnDestroy() {
    this.userProfilSubscription.unsubscribe();
  }

}
