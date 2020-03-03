import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams, ToastController, Nav } from 'ionic-angular';
import { ConnexionService } from '../../services/connexion.service';
import { UserProfil } from "../../models/UserProfil";
import { Subscription } from "rxjs";
import { MoncompteService } from "../../services/moncompte.service";
import { HomePage } from '../home/home';





@Component({
  selector: 'page-moncompte',
  templateUrl: 'moncompte.html'
})

export class MonComptePage implements OnInit, OnDestroy {

  errorMessage: string;
  userProfil: UserProfil;
  userProfilSubscription: Subscription;
  userProfil2: UserProfil;

  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, public navCtrl: NavController, private moncompteService: MoncompteService, private connexionService: ConnexionService) {
  }
  ngOnInit() {
    this.userProfilSubscription = this.moncompteService.userProfil$.subscribe(
      (userProfil) => {
        this.userProfil = userProfil;
        console.log(userProfil);
      }
    );

    this.moncompteService.retrieveData();
    this.userProfil2 = {
      userId: null,
      nom: "Bonin",
      prenom: "Julien",
      telephone: "0669384319",
      email: "boninjulie@eisti.eu",
      dateDeNaissance: new Date(),
      isVerified: false,
      specialite: "Dentiste",
      codePostal: 2,
      unMotSurMoi: "Toujours debout, toujours la banane",
      offres: [],
      favoris: []
    }

    /* this.userProfil2 = this.moncompteService.userProfil; */
  }

  onSaveUserProfil() {
    let loader = this.loadingCtrl.create({
      content: "Sauvegarde en cours..."
    });
    loader.present();
    this.moncompteService.saveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: "Données sauvegardées !",
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

  onFetchUserProfil() {
    let loader = this.loadingCtrl.create({
      content: "Récupération en cours..."
    });
    loader.present();
    this.moncompteService.retrieveData().then(
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

  onDisconnect() {
    this.connexionService.signOut();
    this.navCtrl.parent.parent.setRoot(HomePage);
  }

  ngOnDestroy() {
    this.userProfilSubscription.unsubscribe();
  }

}
