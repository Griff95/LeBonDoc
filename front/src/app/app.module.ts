import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConnexionPage } from '../pages/connexion/connexion';
import { InscriptionPage } from '../pages/inscription/inscription';

import { AuthInterceptor} from "../interceptors/auth-interceptor";
import { AuthService } from '../services/auth.service';
import {DeposerPage} from "../pages/deposer/deposer";
import {FavorisPage} from "../pages/favoris/favoris";
import {MessagesPage} from "../pages/messages/messages";
import {ConversationPage} from "../pages/messages/conversation/conversation"
import {MonComptePage} from "../pages/moncompte/moncompte";
import {OffresPage} from "../pages/offres/offres";
import {TabsPage} from "../pages/tabs/tabs";
import {IonicStorageModule} from "@ionic/storage";
import {OffreSimplePage} from "../pages/offres/offre-simple/offre-simple";
import { DeposerFormPage } from '../pages/deposer/deposer-form/deposer-form';
import { SearchPage } from '../pages/offres/search/search';


import {AdService} from "../services/ad.service";
import {AccountService} from "../services/account.service";

import {Ad} from "../models/Ad";
import {AdChat} from "../models/AdChat";
import {UserProfile} from "../models/UserProfile";
import {JsonService} from "../services/json.service";



@NgModule({
  declarations: [
      MyApp,
      HomePage,
      ConnexionPage,
      InscriptionPage,
      DeposerPage,
      FavorisPage,
      MessagesPage,
      ConversationPage,
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
        IonicStorageModule.forRoot(),
        HttpClientModule
    ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      HomePage,
      ConnexionPage,
      InscriptionPage,
      DeposerPage,
      FavorisPage,
      MessagesPage,
      ConversationPage,
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
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthService,
    JsonService,
    Ad,
    AdChat,
    AdService,
    AccountService,
    UserProfile
  ]
})
export class AppModule {}
