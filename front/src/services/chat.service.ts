import {AdChat} from "../models/AdChat";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ChatService{

  chats: AdChat[];
  chatsList$ = new Subject<AdChat[]>();

  constructor(private http: HttpClient) {
  }


  startOrGetChat(idAd){
    return new Promise( (resolve, reject) => {
        this.http.get('http://localhost:3000/api/adchat/startOrGetChat/' + idAd).subscribe(
            (data: any[]) => {
                this.chats = data;
                this.chatsList$.next(this.chats.slice());
                console.log(data);
                resolve(data);
            }
            // (error) => {
            //     reject(error);
            // }
        )
    })
  }

  sendMessage(){
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
