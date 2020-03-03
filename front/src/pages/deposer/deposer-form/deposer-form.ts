import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { OffresService } from "../../../services/offres.service";
import {DateTime, NavController, NavParams, ViewController} from 'ionic-angular';
import {Offre} from "../../../models/Offre";
import {UserProfil} from "../../../models/UserProfil";
import {Candidature} from "../../../models/Candidature";
import {ConnexionService} from "../../../services/connexion.service";
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


    constructor(private formBuilder: FormBuilder, private offresService: OffresService, public navCtrl: NavController,private  connexionService: ConnexionService) { }

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
        let candidature = new Candidature()
        let newOffre = {titre : this.deposerForm.get('titre').value,description : this.deposerForm.get('description').value,codePostal : this.deposerForm.get('codePostal').value,
          lieux : this.deposerForm.get('lieux').value,dateDebut : this.deposerForm.get('dateDebut').value,dateFin : this.deposerForm.get('dateFin').value,datePublication : new Date(),
          specialite : this.deposerForm.get('specialite').value,candidatures : null,isAvailable : true,annonceType : this.deposerForm.get('annonceType').value,id: this.connexionService.user.uid};
        this.offresService.addOffre(newOffre);
        this.offresService.saveData()
        this.navCtrl.pop();
    }

}
