import { Component, OnInit, Input } from '@angular/core';
import { AdChat } from "../../../models/AdChat";
import { ChatService } from "../../../services/chat.service";


@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html'
})

export class ConversationPage{

  @Input() conv: any;

  messageText: any;
  chatJson: any;



  constructor(private chatService: ChatService) {
  }


  ngOnInit() {

  }


  sendMessage() {

    let chatJson = {
      msg: this.messageText,
      idChat: this.conv._id
    };
    this.chatService.sendMessage(chatJson);

  }
}
