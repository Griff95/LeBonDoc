import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController, ModalController, ToastController} from 'ionic-angular';
import { DeposerFormPage } from './deposer-form/deposer-form';
import {OffresService} from "../../services/offres.service";
import { NavController, NavParams, ViewController } from 'ionic-angular';



@Component({
  selector: 'page-deposer',
  templateUrl: 'deposer.html'
})
export class DeposerPage {
  constructor(private modalCtrl: ModalController,private offresService: OffresService, private toastCtrl: ToastController, public navCtrl: NavController) {

  }
  ajouterOffre() {

    this.navCtrl.push(DeposerFormPage);
}
}