import {Component, OnInit} from '@angular/core';
import {NavController, ViewController} from "ionic-angular";
import {AdService} from "../../../services/ad.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// @ts-ignore
import * as JSONdepartements from "../../../assets/departments.json";
import {AdChat} from "../../../models/AdChat";
import {JsonService} from "../../../services/json.service";
import {Ad} from "../../../models/Ad";


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage  implements OnInit {

  searchForm: FormGroup;

  medicalFields: Object[];
  departements: any;
  adTypes: Object[];
  structureTypes: Object[];
  error: string;


  constructor(private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private jsonService: JsonService,
              private adService: AdService) {
  }

  ngOnInit(): void {
    // this.specialites = Object.keys(Specialite).map(key => Specialite[key]).slice();
    this.departements = JSONdepartements;
    console.log(this.departements);
    this.initForm();
    this.jsonService.getMedicalFields().then(
        (data: Object[]) => {
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
    this.searchForm = this.formBuilder.group({
      medicalField: ['', Validators.required],
      adType: ['',Validators.required],
      structureType: ['',Validators.required],
      postalCode: ['',Validators.required],

    });
  }


  validateSearchFilters() {
    /*var dateSearch = this.searchForm.get('dateSearch').value;
    var codePostal = this.searchForm.get('codePostal').value;
    var specialite = 1;
    //this.searchFilters.dateSearch = this.searchForm.get('dateSearch').value;
    //this.searchFilters.codePostal = this.searchForm.get('codePostal').value;
    //this.searchFilters.specialite = (<any>Specialite)[this.searchForm.get('specialite').value];
    console.log("trying to validate searcf form " + specialite);
    this.viewCtrl.dismiss({ "dateSearch" : dateSearch, "codePostal": codePostal, specialite: specialite});

     */

    this.adService.search(this.searchForm.get('medicalField').value,
        this.searchForm.get('postalCode').value,
        this.searchForm.get('structureType').value,
        this.searchForm.get('adType').value).then(() => {
      this.viewCtrl.dismiss({"medicalField" : this.searchForm.get('medicalField').value,
        "adType" : this.searchForm.get('adType').value,
        "structureType": this.searchForm.get('structureType').value,
        "postalCode": this.searchForm.get('postalCode').value});
    }).catch( (err) => {
      console.log(err);
    });
  }


  dismissSearchModal() {
    this.viewCtrl.dismiss(undefined);
  }

}
