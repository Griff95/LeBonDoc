import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
import { AdChat } from "../../models/AdChat"
=======
import { NavParams } from 'ionic-angular';
import { AdChat } from "../../../models/AdChat";
import { ChatService } from "../../../services/chat.service";
>>>>>>> Stashed changes


@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html'
})
<<<<<<< Updated upstream
export class MessagesPage {
=======
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
>>>>>>> Stashed changes
