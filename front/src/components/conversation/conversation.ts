import { Component, OnInit, Input, NgZone } from '@angular/core';
import { AdChat } from "../../models/AdChat";
import { ChatService } from "../../services/chat.service";
import {ModalController, NavParams, ViewController} from 'ionic-angular';
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
  userId;

  msgList: any;
  msgListSubscription: Subscription;

  constructor(public navParams: NavParams,
              private authService: AuthService,
              private chatService: ChatService,
              private zone: NgZone,
              public viewCtrl : ViewController) {
  }


  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.conv = this.navParams.get('conv');
    console.log(this.conv);

    this.msgList = this.conv.msg;
  }



  checkUser(msg) {
    return (msg.user == this.userId);
  }

  sendMessage() {
    console.log(this.conv);
    let chatJson = {msg: this.messageText, idChat: this.conv._id};
    this.chatService.sendMessage(JSON.stringify(chatJson)).then( (chat) => {
      this.zone.run( () => {
          this.conv = chat;
          this.msgList = this.conv.msg;
      });
    });
    this.messageText = "";
  }

  dismissModal(){
    this.viewCtrl.dismiss();
  }
}
