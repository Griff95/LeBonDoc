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
  private conv: any;

  constructor(public navParams: NavParams,
              private chatService: ChatService) {
  }


  ngOnInit() {
    const conv = this.navParams.get('conv').then(
        (data: AdChat) => {
          this.conv = data;
          console.log(data);
        }, (err) => {console.log(err.toString())}
    );
    console.log(conv);
  }


  sendMessage() {
    console.log(this.conv);
    let chatJson = {
      msg: this.messageText,
      idChat: this.conv._id
    };
    this.chatService.sendMessage(chatJson);

  }
}
