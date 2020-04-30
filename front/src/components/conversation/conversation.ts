import { Component, OnInit, Input } from '@angular/core';
import { AdChat } from "../../models/AdChat";
import { ChatService } from "../../services/chat.service";
import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html'
})

export class ConversationComponent{

  messageText: any;
  chatJson: any;


  constructor(public navParams: NavParams,
              private chatService: ChatService) {
  }


  ngOnInit() {
    console.log(this.navParams.get('conv'));
  }


  sendMessage() {

    let chatJson = {
      msg: this.messageText,
      idChat: this.conv._id
    };
    this.chatService.sendMessage(chatJson);

  }
}
