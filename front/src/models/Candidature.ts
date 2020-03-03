import {Injectable} from "@angular/core";
import {User} from "firebase";
import {Offre} from "../models/Offre";


@Injectable()
export class Candidature {
	candidat: User;
	msg: string;
	dateSoumission: Date;
	validated: boolean;
	target: Offre;

  constructor() {

  }

}
