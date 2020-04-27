import {Component, OnInit} from '@angular/core';
import {ViewController} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JsonService} from "../../../services/json.service";


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage  implements OnInit {

  searchForm: FormGroup;

  medicalFields: Object[];
  adTypes: Object[];
  structureTypes: Object[];
  error: string;


  constructor(private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private jsonService: JsonService) {
  }

  ngOnInit(): void {
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
      this.viewCtrl.dismiss({
        medicalField : this.searchForm.get('medicalField').value,
        adType : this.searchForm.get('adType').value,
        structureType: this.searchForm.get('structureType').value,
        postalCode: this.searchForm.get('postalCode').value
      });

  }


  dismissSearchModal() {
    this.viewCtrl.dismiss(undefined);
  }

}
