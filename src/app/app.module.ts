import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import * as firebase from 'firebase';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConnexionPage } from '../pages/connexion/connexion';
import { InscriptionPage } from '../pages/inscription/inscription';


import { ConnexionService } from '../services/connexion.service';
import {CalendrierPage} from "../pages/calendrier/calendrier";
import {DeposerPage} from "../pages/deposer/deposer";
import {FavorisPage} from "../pages/favoris/favoris";
import {MessagesPage} from "../pages/messages/messages";
import {MonComptePage} from "../pages/moncompte/moncompte";
import {OffresPage} from "../pages/offres/offres";
import {TabsPage} from "../pages/tabs/tabs";
import {IonicStorageModule} from "@ionic/storage";
import {OffreSimplePage} from "../pages/offres/offre-simple/offre-simple";
import { DeposerFormPage } from '../pages/deposer/deposer-form/deposer-form';
import { SearchPage } from '../pages/offres/search/search';


import { OffresFav} from '../pages/favoris/offresfav';
import {OffresService} from "../services/offres.service";
import {MoncompteService} from "../services/moncompte.service";

import {Offre} from "../models/Offre";
import {Candidature} from "../models/Candidature";
import {Specialite} from "../models/Specialite";
import {OffreType} from "../models/OffreType";
import {UserProfil} from "../models/UserProfil";




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConnexionPage,
    InscriptionPage,
    CalendrierPage,
    DeposerPage,
    FavorisPage,
    MessagesPage,
    MonComptePage,
    OffresPage,
    TabsPage,
    OffreSimplePage,
    DeposerFormPage,
    SearchPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConnexionPage,
    InscriptionPage,
    CalendrierPage,
    DeposerPage,
    FavorisPage,
    MessagesPage,
    MonComptePage,
    OffresPage,
    TabsPage,
    OffreSimplePage,
    DeposerFormPage,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnexionService,
    OffresFav,
    Offre,
    Candidature,
    OffresService,
    MoncompteService,
    UserProfil
  ]
})
export class AppModule {}
