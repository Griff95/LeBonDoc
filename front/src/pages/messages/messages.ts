import { Component, OnInit, NgZone } from '@angular/core';
import { AdChat } from "../../models/AdChat";
import { ChatService } from "../../services/chat.service";
import { ModalController } from 'ionic-angular';
import {Subscription} from "rxjs";
import {ConversationPage} from '../../components/conversation/conversation'

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {

  chatsList: AdChat[];
  chatsListSubscription: Subscription;

  constructor(private chatService: ChatService,
              private zone: NgZone) {
  }

  ngOnInit() {
    this.chatsListSubscription = this.chatService.chatsList$.subscribe(
      (allChats: AdChat[]) => {
      this.zone.run(() => {
        this.chatsList = allChats;
      });
    });
  }


  onLoadConv(conv: AdChat) {
    let modal = this.modalCtrl.create(ConversationPage, {conv: conv});
    modal.present();
    modal.onDidDismiss(() => this.ngOnInit());
  }

}
