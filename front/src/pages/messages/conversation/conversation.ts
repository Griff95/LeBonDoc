import { Component, OnInit } from '@angular/core';
import { AdChat } from "../../models/AdChat"
import { ChatService } from "../../services/chat.service";


@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html'
})
export class MessagesPage implements OnInit {

  constructor(private chatService: ChatService) {

  }

  messageText: any;
  chatJson: any;
  conv: AdChat;






  sendMessage() {
    let chatJson = {
      msg: this.messageText,
      idChat: this.conv.ad.type
    };
    this.chatService.sendMessage(chatJson);

  }
}
