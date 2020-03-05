import {Injectable} from "@angular/core";
import {User} from "firebase";
import {Ad} from "./Ad";


@Injectable()
export class AdChat {
	user: User;
	advertiser: User;
	ad: Ad;
	msg: [{
		user: User;
		msg: string;
		createdAt: Date;
	}];
	editedAt: Date;
	createdAt: Date;

  constructor() {

  }

}
