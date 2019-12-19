import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { OffresService } from "../../../services/offres.service";
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
    selector: 'deposer-form',
    templateUrl: 'deposer-form.html'
})
export class DeposerFormPage implements OnInit {

    deposerForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private offresService: OffresService, public navCtrl: NavController) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.deposerForm = this.formBuilder.group({
            name: ['', Validators.required],
            lieux: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    onSubmitForm() {
        let newOffre = {
            "name": this.deposerForm.get('name').value,
            lieux: this.deposerForm.get('lieux').value,
            description: [
                this.deposerForm.get('description').value
            ],
            isFav: false,
            userId: 1,
            id: 4
        };
        this.offresService.addOffre(newOffre);
        this.offresService.saveData()
        this.navCtrl.pop();
    }

}