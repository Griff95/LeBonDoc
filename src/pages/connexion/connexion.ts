import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ConnexionService } from '../../services/connexion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TabsPage} from "../tabs/tabs"
import * as firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;
import {MoncompteService} from "../../services/moncompte.service";
import {UserProfil} from "../../models/UserProfil";
import {Subscription} from "rxjs";



/**
 * Generated class for the ConnexionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class ConnexionPage implements OnInit{

  connexionForm: FormGroup;
  errorMessage: string;
  private authForm: FormGroup;

  constructor(private moncompteService: MoncompteService,private navParams: NavParams, public navCtrl: NavController,public viewCtrl: ViewController, private formBuilder: FormBuilder,private connexionService: ConnexionService ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionPage');
  }

  ngOnInit(){

    this.initForm();
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmitForm() {
  const email = this.authForm.get('email').value;
  const password = this.authForm.get('password').value;

    this.connexionService.signInUser(email, password).then(
      () => {
        this.navCtrl.setRoot(TabsPage);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
    //this.moncompteService.retrieveData();
    //console.log(this.moncompteService.userProfil.prenom)
  }




}
