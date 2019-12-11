import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import { ConnexionService } from '../../services/connexion.service';
import { HomePage } from '../home/home';
import {UserProfil} from "../../models/UserProfil";
import {Subscription} from "rxjs";
import {Offre} from "../../models/Offre";
import {MoncompteService} from "../../services/moncompte.service";



@Component({
  selector: 'page-moncompte',
  templateUrl: 'moncompte.html'
})

export class MonComptePage implements OnInit, OnDestroy{

  errorMessage: string;
  userProfil: UserProfil;
  userProfilSubscription: Subscription;

   constructor(public toastCtrl: ToastController,public loadingCtrl: LoadingController,public navCtrl: NavController, private moncompteService: MoncompteService,private connexionService: ConnexionService) {
  }

  ngOnInit(){
    this.userProfilSubscription = this.moncompteService.userProfil$.subscribe(
      (userProfil  ) => {
        this.userProfil = userProfil;
      }
    );
    this.moncompteService.retrieveData();
  }

  onSaveUserProfil(){
    let loader = this.loadingCtrl.create({
      content: "Sauvegarde en cours..."
    });
    loader.present();
    this.moncompteService.saveData().then(
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

  onFetchUserProfil(){
    let loader = this.loadingCtrl.create({
      content: "Récupération en cours..."
    });
    loader.present();
    this.moncompteService.retrieveData().then(
      ()=>{
        loader.dismiss();
        this.toastCtrl.create({
          message: "Données récupérées !",
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

  onDisconnect() {
    this.connexionService.signOut();
    this.navCtrl.setRoot(HomePage);
  }

  ngOnDestroy(){
     this.moncompteService.userProfil$.unsubscribe()
  }

}
