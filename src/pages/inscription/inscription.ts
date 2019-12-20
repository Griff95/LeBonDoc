import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ConnexionService } from '../../services/connexion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabsPage } from "../tabs/tabs";
import { nodeModuleNameResolver } from 'typescript';
import { MoncompteService } from "../../services/moncompte.service";
import { Offre } from "../../models/Offre";


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

  constructor(private navParams: NavParams, public navCtrl: NavController, public viewCtrl: ViewController, private formBuilder: FormBuilder, private connexionService: ConnexionService, private moncompteservice: MoncompteService, public offre: Offre) {
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
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      birthdate: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      PostalCode: ['', Validators.required],
      specialite: ['', Validators.required],
      MotPerso: ['', Validators.required]

    });

    /* user:User;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  dateDeNaissance: Date;
  isVerified: boolean;
  offres: Offre[];
  favoris: Offre[];
  specialite: Specialite;
  codePostal: number;
  unMotSurMoi: string; */
  }

  onSubmitForm() {
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    const birth = this.authForm.get('birthdate').value;
    const phone = this.authForm.get('PhoneNumber').value;
    const PostalCode = this.authForm.get('PostalCode').value;
    const MotPerso = this.authForm.get('MotPerso').value;
    const prenom = this.authForm.get('prenom').value;
    const nom = this.authForm.get('nom').value;
    const specialite = this.authForm.get('specialite').value;

    let newUser = {
      userId: null,
      nom: nom,
      prenom: prenom,
      telephone: phone,
      email: email,
      dateDeNaissance: birth,
      isVerified: false,
      offres: [],
      favoris: [],
      specialite: specialite,
      codePostal: PostalCode,
      unMotSurMoi: MotPerso
    }

    this.moncompteservice.addUserProfile(newUser);
    this.connexionService.signUpUser(email, password).then(
      () => {
        this.navCtrl.push(TabsPage);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
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
