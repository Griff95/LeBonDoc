import { Component, OnInit, NgZone } from '@angular/core';
import { AdChat } from "../../models/AdChat";
import { ChatService } from "../../services/chat.service";
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {

  chatsList: AdChat[];

  constructor(private chatService: ChatService,
              private zone: NgZone,
              private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.chatsListSubscription = this.chatService.chatsList$.subscribe(
      (allChats: AdChat[]) => {
      this.zone.run(() => {
        this.chatsList = allChats;
      });
    });
  }

  onLoadConv(conv) {
    let modal = this.modalCtrl.create(MessagesPage, {conv: conv});
    modal.present();
    modal.onDidDismiss(() => this.ngOnInit());
  }

}
