import {Component, OnInit} from '@angular/core';
import {NavController, ViewController} from "ionic-angular";
import {OffresService} from "../../../services/offres.service";
import {Specialite} from "../../../models/Specialite";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// @ts-ignore
import * as JSONdepartements from "../../../assets/departments.json";
import {AdChat} from "../../../models/AdChat";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage  implements OnInit {

  searchForm: FormGroup;
  specialites : Specialite[];
  searchFilters: { dateSearch : Date, codePostal: number, specialite: Specialite};
  departements: any;

  constructor(private viewCtrl: ViewController,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.specialites = Object.keys(Specialite).map(key => Specialite[key]).slice();
    this.departements = JSONdepartements;
    console.log(this.departements);
    this.initForm();
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      dateSearch: ['', ],
      codePostal: ['', ],
      specialite: ['', ],

    });
  }

  validateSearchFilters() {
    var dateSearch = this.searchForm.get('dateSearch').value;
    var codePostal = this.searchForm.get('codePostal').value;
    var specialite = (<any>Specialite)[this.searchForm.get('specialite').value];
    //this.searchFilters.dateSearch = this.searchForm.get('dateSearch').value;
    //this.searchFilters.codePostal = this.searchForm.get('codePostal').value;
    //this.searchFilters.specialite = (<any>Specialite)[this.searchForm.get('specialite').value];
    console.log("trying to validate searcf form " + specialite);
    this.viewCtrl.dismiss({ "dateSearch" : dateSearch, "codePostal": codePostal, specialite: specialite});
  }


  dismissSearchModal() {
    this.viewCtrl.dismiss(undefined);
  }

}
