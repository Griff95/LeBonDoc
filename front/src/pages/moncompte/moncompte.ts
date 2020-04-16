import {Component, CUSTOM_ELEMENTS_SCHEMA, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController, Nav, Select} from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from "../../models/UserProfile";
import { Subscription } from "rxjs";
import { AccountService } from "../../services/account.service";
import { JsonService} from "../../services/json.service";
import { HomePage } from '../home/home';
import {User} from "firebase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'page-moncompte',
    templateUrl: 'moncompte.html'
})

export class MonComptePage implements OnInit, OnDestroy {

    errorMessage: string;
    userProfile: UserProfile;
    userProfilSubscription: Subscription;

    medicalFields: Object[];
    private editProfileForm : FormGroup;

    search: string;

    constructor(public toastCtrl: ToastController,
                public loadingCtrl: LoadingController,
                public navCtrl: NavController,
                private accountService: AccountService,
                private authService: AuthService,
                private formBuilder: FormBuilder,
                private jsonService: JsonService,
                private zone: NgZone) {
    }
    ngOnInit() {
        console.log('init');
        this.initForm();
        console.log('init End');
        this.accountService.getAccount(this.authService.getUserId()).then(
            (profile: UserProfile) => {
                this.userProfile = profile;
            }
        );
        this.jsonService.getMedicalFields().then(
            (data: Object[]) => {
                this.medicalFields = data;
            }
        );
        this.userProfilSubscription = this.accountService.userProfil$.subscribe(
            (user) => {
                this.userProfile = user;
                this.editProfileForm.controls['medicalField'].setValue(user.medicalField);
                console.log(user);
            });


    }

    initForm() {
        this.editProfileForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            name: ['', Validators.required],
            lastName: ['', Validators.required],
            phone: ['', Validators.required],
            postalCode: ['', Validators.required],
            department: ['', Validators.required],
            region: ['', Validators.required],
            city: ['', Validators.required],
            medicalField: ['', Validators.required],
            presentation: ['', Validators.required]
        });
    }

    onEditProfile(form : FormGroup) {
        let loader = this.loadingCtrl.create({
            content: "Sauvegarde en cours..."
        });
        loader.present();
        let edit = new UserProfile();
        edit.lastName = form.get('lastName').value;
        edit.name = form.get('name').value;
        edit.email = form.get('email').value;
        edit.medicalField = form.get('medicalField').value;
        // edit.postalCode = this.foundLocation.postalCode ? this.foundLocation.postalCode : undefined;
        // edit.department = this.foundLocation.department != null ? this.foundLocation.department : undefined;
        // edit.city = this.foundLocation.city != null ? this.foundLocation.city : undefined;
        // edit.region = this.foundLocation.region != null ? this.foundLocation.region : undefined;
        edit.postalCode = form.get('postalCode').value;
        edit.department = form.get('department').value;
        edit.city = form.get('city').value;
        edit.region = form.get('region').value;

        edit.presentation = form.get('presentation').value;
        edit.phone = form.get('phone').value;

        this.accountService.editProfile(edit).then(
            () => {
                loader.dismiss();
                this.toastCtrl.create({
                    message: "Données sauvegardées !",
                    duration: 3000,
                    position: "bottom"
                }).present();
            }
        ).catch(
            (error) => {
                loader.dismiss();
                this.toastCtrl.create({
                    message: error,
                    duration: 3000,
                    position: "bottom"
                }).present();
            }
        )
    }


    /*
      onFetchUserProfil() {
        let loader = this.loadingCtrl.create({
          content: "Récupération en cours..."
        });
        loader.present();
        this.accountService.getAccount(this.authService.getUserId()).then(
          () => {
            loader.dismiss();
            this.toastCtrl.create({
              message: "Données récupérées !",
              duration: 3000,
              position: "bottom"
            }).present();
          }
        ).catch(
          (error) => {
            loader.dismiss();
            this.toastCtrl.create({
              message: error,
              duration: 3000,
              position: "bottom"
            }).present();
          }
        )
      }
    */
    searchLocation($event, form) {
        this.search = $event.target.value;
        console.log("searchLocation called" + this.search);

        this.jsonService.findLocationByPostalCode(this.search).then((location: any) => {
            this.zone.run(() => {
                console.log(JSON.stringify(location));
                this.userProfile.postalCode = location.postalCode;
                this.userProfile.department = location.department;
                this.userProfile.city = location.city;
                this.userProfile.region = location.region;
            });
        }).catch( (error) => {
            this.userProfile.department = "";
            this.userProfile.city = "";
            this.userProfile.region = "";
        });

    }


    onDisconnect() {
        this.authService.logOut();
        this.navCtrl.parent.parent.setRoot(HomePage);
    }

    ngOnDestroy() {
        this.userProfilSubscription.unsubscribe();
    }
}
