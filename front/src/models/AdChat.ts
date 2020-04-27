import {Injectable} from "@angular/core";
import {Ad} from "./Ad";
import {UserProfile} from "./UserProfile";


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
