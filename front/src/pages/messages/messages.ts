import { Component, OnInit, NgZone } from '@angular/core';
import { AdChat } from "../../models/AdChat";
import { ChatService } from "../../services/chat.service";
import { ModalController, NavParams } from 'ionic-angular';
import {Subscription} from "rxjs";
import {ConversationComponent} from '../../components/conversation/conversation'

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {

  chatsList: AdChat[];
  chatsListSubscription: Subscription;
  test: int;

  constructor(public navParams: NavParams,
              private chatService: ChatService,
              private zone: NgZone,
              private modalCtrl: ModalController) {
  }

  ngOnInit() {
    console.log(this.navParams.get('test'));
    this.chatsListSubscription = this.chatService.chatsList$.subscribe(
      (allChats: AdChat[]) => {
      this.zone.run(() => {
        this.chatsList = allChats;
      });
    });
  }


  onLoadConv(conv: AdChat) {
    let modal = this.modalCtrl.create(ConversationComponent, {conv: conv});
    modal.present();
    modal.onDidDismiss(() => this.ngOnInit());
  }

}
