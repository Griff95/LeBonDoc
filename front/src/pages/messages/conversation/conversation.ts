import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { AdChat } from "../../../models/AdChat";
import { ChatService } from "../../../services/chat.service";


@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html'
})

export class ConversationPage{


  messageText: any;
  chatJson: any;
  conv: AdChat;


  constructor(private chatService: ChatService,
              params: NavParams) {
    console.log('conv');
    let conv = params.get('conv');
    console.log(conv);
  }




  ngOnInit() {

  }








  sendMessage() {
    let chatJson = {
      msg: this.messageText,
      idChat: this.conv['_id']
    };
    this.chatService.sendMessage(chatJson);

  }
}
