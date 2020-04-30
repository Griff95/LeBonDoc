import { Component } from '@angular/core';
import { OffresPage } from '../offres/offres';
import { MonComptePage } from '../moncompte/moncompte';
import { FavorisPage } from '../favoris/favoris';
import { DeposerPage } from '../deposer/deposer';
import { MessagesPage } from '../messages/messages';
import {NavParams} from "ionic-angular";



@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  moncomptePage = MonComptePage;
  offresPage = OffresPage;
  favorisPage = FavorisPage;
  messagesPage = MessagesPage;
  deposerPage = DeposerPage;
  public tabIndex : Number = 0;

  constructor(public navParams: NavParams) {
    let tabIndex = this.navParams.get('tabIndex');
    if (tabIndex) {
      this.tabIndex = tabIndex;
    }
  }
  


}