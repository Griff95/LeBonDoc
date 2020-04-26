import { Component, OnInit, NgZone } from '@angular/core';
import { AdChat } from "../../models/AdChat"
import { ChatService } from "../../services/chat.service"

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {

  chatsList: AdChat[];

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

}
