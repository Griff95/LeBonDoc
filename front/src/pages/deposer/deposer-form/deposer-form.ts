import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AdService } from "../../../services/ad.service";
import {DateTime, NavController, NavParams, ViewController} from 'ionic-angular';
import {Ad} from "../../../models/Ad";
import {UserProfile} from "../../../models/UserProfile";
import {AdChat} from "../../../models/AdChat";
import {AuthService} from "../../../services/auth.service";
import {Subscription} from "rxjs";
import {JsonService} from "../../../services/json.service";


@Component({
    selector: 'deposer-form',
    templateUrl: 'deposer-form.html'
})
export class DeposerFormPage implements OnInit {

    error: string;
    postAdForm: FormGroup;
    medicalFields: Object[];
    adTypes: Object[];
    structureTypes: Object[];


    constructor(private formBuilder: FormBuilder,
                private adService: AdService,
                public navCtrl: NavController,
                private  authService: AuthService,
                private jsonService: JsonService) { }

    ngOnInit() {
        this.initForm();
        this.jsonService.getMedicalFields().then(
            (data : Object[]) => {
                this.medicalFields = data;
            }
        );
        this.jsonService.getAdTypes().then(
            (data : Object[]) => {
                this.adTypes = data;
            }
        );
        this.jsonService.getStructureTypes().then(
            (data : Object[]) => {
                this.structureTypes = data;
            }
        )

    }

    initForm() {
        this.postAdForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            medicalField: ['', Validators.required],
            adType: ['',Validators.required],
            retrocession: [''],
            hSName: ['',Validators.required],
            hSStructureType: ['',Validators.required],
            hSPostalCode: ['',Validators.required],
            hSCity: ['',Validators.required],
            hSDepartment: ['',Validators.required]
        });
    }

    onSubmitForm() {
        let newAd = new Ad();
        newAd.title = this.postAdForm.get('title').value;
        newAd.description = this.postAdForm.get('description').value;
        newAd.medicalField = this.postAdForm.get('medicalField').value;
        newAd.adType = this.postAdForm.get('adType').value;
        newAd.retrocession = this.postAdForm.get('retrocession').value;
        newAd.healthStructure = Object();
        newAd.healthStructure.name = this.postAdForm.get('hSName').value;
        newAd.healthStructure.structureType = this.postAdForm.get('hSStructureType').value;
        newAd.healthStructure.postalCode = this.postAdForm.get('hSPostalCode').value;
        newAd.healthStructure.city = this.postAdForm.get('hSCity').value;
        newAd.healthStructure.department = this.postAdForm.get('hSDepartment').value;

        this.adService.postAd(JSON.stringify(newAd)).then(() => {
            this.navCtrl.pop();
        }).catch( (err) => {
            this.error = "Problème";
        });
    }

}
