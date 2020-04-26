import {Injectable} from "@angular/core";
import {UserProfile} from "./UserProfile";
import {Ad} from "./Ad";


@Injectable()
export class AdChat {
	user: UserProfile;
	advertiser: UserProfile;
	ad: Ad;
	msg: [{
		user: UserProfile;
		msg: string;
		createdAt: Date;
	}];
	editedAt: Date;
	createdAt: Date;

  constructor() {

  }

}
