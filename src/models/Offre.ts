import {Injectable} from "@angular/core";
import {User} from "firebase";
import {Specialite} from "../models/Specialite";
import {Candidature} from "../models/Candidature";
import {OffreType} from "./OffreType";


@Injectable()
export class Offre {
	titre: string;
	description : string;
	codePostal : number;
	lieux: string;
	dateDebut : Date;
	dateFin : Date;
	datePublication : Date;
	specialite : Specialite;
	annonceur : User;
	candidatures : Candidature[];
	isAvailable : boolean;
	annonceType : OffreType;

  constructor() {

  }

}
