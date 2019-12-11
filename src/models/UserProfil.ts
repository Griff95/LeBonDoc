import {Injectable} from "@angular/core";
import {User} from "firebase";

@Injectable()
export class UserProfil {
  user:User
  nom: string;
  specialite: string;
  isAuth: boolean;
  favOffresId: number[];

  constructor(public name: string) {

  }

}
