import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { OffresService } from "../../../services/offres.service";
import {DateTime, NavController, NavParams, ViewController} from 'ionic-angular';
import {Ad} from "../../../models/Ad";
import {UserProfile} from "../../../models/UserProfile";
import {AdChat} from "../../../models/AdChat";
import {AuthService} from "../../../services/auth.service";
import {Specialite} from "../../../models/Specialite";
import {OffreType} from "../../../models/OffreType";


@Component({
    selector: 'deposer-form',
    templateUrl: 'deposer-form.html'
})
export class DeposerFormPage implements OnInit {

    deposerForm: FormGroup;
    Specialite: ['Chirurgien','Dentiste','Infirmier','Medecin_Generaliste'];
    OffreType: ['partenariat','remplacement'];
    //Specialite : Specialite;
    //OffreType : OffreType;


    constructor(private formBuilder: FormBuilder, private offresService: OffresService, public navCtrl: NavController,private  authService: AuthService) { }

    ngOnInit() {
        this.initForm();

    }

    initForm() {
        this.deposerForm = this.formBuilder.group({
          titre: ['', Validators.required],
          lieux: ['', Validators.required],
          description: ['', Validators.required],
          codePostal: ['',Validators.required],
          dateDebut: ['',Validators.required],
          dateFin: ['',Validators.required],
          specialite: ['',Validators.required],
          annonceType: ['',Validators.required]

        });
    }

    onSubmitForm() {
        let candidature = new AdChat()
        let newOffre = {titre : this.deposerForm.get('titre').value,description : this.deposerForm.get('description').value,codePostal : this.deposerForm.get('codePostal').value,
          lieux : this.deposerForm.get('lieux').value,dateDebut : this.deposerForm.get('dateDebut').value,dateFin : this.deposerForm.get('dateFin').value,datePublication : new Date(),
          specialite : this.deposerForm.get('specialite').value,candidatures : null,isAvailable : true,annonceType : this.deposerForm.get('annonceType').value,id: this.authService.userId};
        this.offresService.addOffre(newOffre);
        this.offresService.saveData()
        this.navCtrl.pop();
    }

}
