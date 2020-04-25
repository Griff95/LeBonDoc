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


  constructor(/*titre: string,
                description : string,
                codePostal : number,
                lieux: string,
                dateDebut : Date,
                dateFin : Date,
                datePublication : Date,
                specialite : Specialite,
                annonceur : User,
                candidatures : AdChat[],
                isAvailable : boolean,
                annonceType : OffreType*/) {

    /*this.titre=titre;
    this.description=description;
    this.codePostal=codePostal;
    this.lieux=lieux;
    this.dateDebut=dateDebut;
    this.dateFin=dateFin
    this.datePublication=datePublication;
    this.specialite=specialite;
    this.annonceur=annonceur;
    this.candidatures=candidatures;
    this.isAvailable=isAvailable;
    this.annonceType=annonceType;*/


  }

}
