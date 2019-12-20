import {Component, OnInit} from '@angular/core';
import {NavController, ViewController} from "ionic-angular";
import {OffresService} from "../../../services/offres.service";
import {Specialite} from "../../../models/Specialite";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Candidature} from "../../../models/Candidature";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage  implements OnInit {

  searchForm: FormGroup;
  specialites : Specialite[];

  constructor(private viewCtrl: ViewController, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    console.log(Object.keys(Specialite))
    this.specialites = Object.keys(Specialite).map(key => Specialite[key]).slice();
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
    var specialite = this.searchForm.get('specialite').value;
    console.log("validateSearchFilter called : " + dateSearch + "  " + codePostal + "  " + specialite);
    this.viewCtrl.dismiss();
  }


  dismissSearchModal() {
    this.viewCtrl.dismiss();
  }
}
