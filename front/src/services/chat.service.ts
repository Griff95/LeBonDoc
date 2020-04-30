import {AdChat} from "../models/AdChat";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";


@Injectable()
export class ChatService{

  chat: AdChat[];
  msgList$ = new Subject<AdChat[]>();

  chats: AdChat[];
  chatsList$ = new Subject<AdChat[]>();

  constructor(private http: HttpClient,
              private auth: AuthService) {
  }


  startOrGetChat(idAd){
    return new Promise( (resolve, reject) => {
        this.http.get('http://localhost:3000/api/adchat/startOrGetChat/' + idAd).subscribe(
            (data: any[]) => {
                this.chat = data;
                this.msgList$.next();
                resolve(data);
            },
            (error) => {
                reject(error);
            }
        )
    })
  }

  getUserAdChats() {
    return new Promise( (resolve, reject) => {
      this.http.get('http://localhost:3000/api/userAdChats' + this.auth.getUserId()).subscribe(
        (data: any[]) => {
          this.chats = data;
          this.chatsList$.next();
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      )
    })
  }

  sendMessage(chatJson){
    return new Promise( (resolve, reject) => {
        this.http.post('http://localhost:3000/api/adchat/sendMessage', chatJson).subscribe(
            (data) => {
                resolve(data);
            },
            (error) => {
                reject(error);
            }
        )
    })
  }


}
