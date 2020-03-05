import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabsPage } from "../tabs/tabs";
import { nodeModuleNameResolver } from 'typescript';
import { AccountService } from "../../services/account.service";
import { Ad } from "../../models/Ad";


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

  constructor(private navParams: NavParams,
              public navCtrl: NavController,
              public viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
  }

  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      postalCode: ['', Validators.required],
      department: ['', Validators.required],
      city: ['', Validators.required],
      medicalField: ['', Validators.required]
    });
  }

  onSignUp() {
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    const confirmPassword = this.authForm.get('confirmPassword').value;
    const phone = this.authForm.get('phone').value;
    const postalCode = this.authForm.get('postalCode').value;
    const name = this.authForm.get('name').value;
    const lastName = this.authForm.get('lastName').value;
    const medicalField = this.authForm.get('medicalField').value;
    const department = this.authForm.get('department').value;
    const city = this.authForm.get('city').value;

    if (password == confirmPassword) {
      let newUser = {
        lastName: lastName,
        password: password,
        name: name,
        phone: phone,
        email: email,
        medicalField: medicalField,
        postalCode: postalCode,
        department: department,
        city: city
      };


      this.authService.signUp(newUser).then(
          () => {
            this.navCtrl.push(TabsPage);
          },
          (error) => {
            this.errorMessage = error;
          }
      );
    } else {
      this.errorMessage = "Les mots de passe de coïncident pas";
    }
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  change() {
    // get elements
    var element = document.getElementById('messageInputBox');
    var textarea = element.getElementsByTagName('textarea')[0];

    // set default style for textarea
    textarea.style.minHeight = '0';
    textarea.style.height = '0';

    // limit size to 96 pixels (6 lines of text)
    var scroll_height = textarea.scrollHeight;
    if (scroll_height > 96)
      scroll_height = 96;

    // apply new style
    element.style.height = scroll_height + "px";
    textarea.style.minHeight = scroll_height + "px";
    textarea.style.height = scroll_height + "px";
  }
}
