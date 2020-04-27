import {Injectable} from "@angular/core";
import {UserProfile} from "./UserProfile";


@Injectable()
export class Ad {

	advertiser: UserProfile;
	title: string;
	description: string;
	medicalField: string;
	adType: string;
	retrocession: number;
	isAvailable: boolean;
	healthStructure: {
		name: string;
		structureType: string;
		postalCode: number;
		city: string;
		department: string;
		region: string;
	};
	editedAt: Date;
	createdAt: Date;
	public  _id : String;


  constructor() {}

}
