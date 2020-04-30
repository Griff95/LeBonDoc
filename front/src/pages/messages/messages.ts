import { Component, OnInit, NgZone } from '@angular/core';
import { AdChat } from "../../models/AdChat";
import { ChatService } from "../../services/chat.service";
import { ModalController, NavParams } from 'ionic-angular';
import {Subscription} from "rxjs";
import {ConversationComponent} from '../../components/conversation/conversation';
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {

  chatsList: AdChat[];
  chatsListSubscription: Subscription;

  constructor(public navParams: NavParams,
              private chatService: ChatService,
              private authService: AuthService,
              private zone: NgZone,
              private modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    this.chatsListSubscription = this.chatService.chatsList$.subscribe(
      (allChats: AdChat[]) => {
      this.zone.run(() => {
        this.chatsList = allChats;
      });
    });
    
    this.chatService.getUserAdChats();

  }

  onLoadConv(conv: AdChat) {
    let modal = this.modalCtrl.create(ConversationComponent, {conv: conv});
    modal.present();
    modal.onDidDismiss(() => this.ionViewWillEnter());
  }

}
