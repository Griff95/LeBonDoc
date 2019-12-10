import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConnexionService } from '../../services/connexion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardPage } from '../dashboard/dashboard';
/**
 * Generated class for the InscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage {

  connexionForm: FormGroup;
  errorMessage: string;
  private authForm: FormGroup;

  constructor(private navParams: NavParams, public navCtrl: NavController, private formBuilder: FormBuilder,private connexionService: ConnexionService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
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

    this.connexionService.signUpUser(email, password).then(
      () => {
        this.navCtrl.push(DashboardPage);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
