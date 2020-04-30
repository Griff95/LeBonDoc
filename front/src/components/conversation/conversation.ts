import { Component, OnInit, Input, NgZone } from '@angular/core';
import { AdChat } from "../../models/AdChat";
import { ChatService } from "../../services/chat.service";
import { NavParams } from 'ionic-angular';
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html'
})

export class ConversationComponent{

  messageText: any;
  chatJson: any;
  conv: any;
  user: any;

  msgList: any;
  msgListSubscription: Subscription;

  constructor(public navParams: NavParams,
              private authService: AuthService,
              private chatService: ChatService,
              private zone: NgZone) {
  }


  ngOnInit() {
    const userId = this.authService.getUserId();
    const conv = this.navParams.get('conv').then(
        (data: AdChat) => {
          this.conv = data;
          console.log(data);
        }
       // (err) => {console.log(err.toString())}
    );
    console.log(conv);


    this.msgListSubscription = this.chatService.msgList$.subscribe(
      (allChats: AdChat[]) => {
      this.zone.run(() => {
        this.msgList = allChats;
      });
    });




  }


  sendMessage() {
    console.log(this.conv);
    let chatJson = {msg: this.messageText, idChat: this.conv._id};
    this.chatService.sendMessage(JSON.stringify(chatJson));
  }
}
