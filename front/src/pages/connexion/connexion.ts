import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TabsPage} from "../tabs/tabs"
import {AccountService} from "../../services/account.service";



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

  constructor(private moncompteService: AccountService,
              private navParams: NavParams,
              public navCtrl: NavController,
              public viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private authService: AuthService ) {
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

  onLogIn() {
  const email = this.authForm.get('email').value;
  const password = this.authForm.get('password').value;

    this.authService.login(email, password).then(
      () => {
        this.navCtrl.setRoot(TabsPage);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  };


}
