import { Component, OnInit, NgZone } from '@angular/core';
<<<<<<< Updated upstream
import { AdChat } from "../../models/AdChat"
import { ChatService } from "../../services/chat.service"
=======
import { AdChat } from "../../models/AdChat";
import { ChatService } from "../../services/chat.service";
import { ModalController } from 'ionic-angular';
import {Subscription} from "rxjs";
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
=======
  onLoadConv(conv: AdChat) {
    let modal = this.modalCtrl.create(MessagesPage, {conv: conv});
    modal.present();
    modal.onDidDismiss(() => this.ngOnInit());
  }

>>>>>>> Stashed changes
}
