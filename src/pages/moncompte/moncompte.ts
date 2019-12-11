import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConnexionService } from '../../services/connexion.service';
import { HomePage } from '../home/home';



@Component({
  selector: 'page-moncompte',
  templateUrl: 'moncompte.html'
})

export class MonComptePage {

  errorMessage: string;
  
   constructor(public navCtrl: NavController, public navParams: NavParams,private connexionService: ConnexionService) {
  }


  onDisconnect() {
    this.connexionService.signOut();
    this.navCtrl.setRoot(HomePage);
  }

}
