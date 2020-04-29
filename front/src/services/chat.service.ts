import {AdChat} from "../models/AdChat";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";


@Injectable()
export class ChatService {




  chats: AdChat[];
  chatsList$ = new Subject<AdChat[]>();


  constructor(private http: HttpClient) {
  }

  getChat(id){
    return new Promise( (resolve, reject) => {
        this.http.get('http://localhost:3000/api/startOrGetChat/' + idAd).subscribe(
            (data: any[]) => {
                console.log(data);
                this.chats = data;
                this.chatsList$.next(this.chats.slice());
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
        this.http.post('http://localhost:3000/api/sendMessage', chatJson).subscribe(
            (data) => {
                console.log("Message envoyé")
                resolve(data);
            },
            (error) => {
                reject(error);
            }
        )
    })
  }

}
