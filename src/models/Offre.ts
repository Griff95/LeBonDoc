import {Injectable} from "@angular/core";
import {User} from "firebase";
import {Specialite} from "../models/Specialite";
import {Candidature} from "../models/Candidature";
import {OffreType} from "./OffreType";
import {AbstractControl} from "@angular/forms";


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
	candidatures : String;
	isAvailable : boolean;
	id: string;
	annonceType : OffreType;


  constructor(/*titre: string,
                description : string,
                codePostal : number,
                lieux: string,
                dateDebut : Date,
                dateFin : Date,
                datePublication : Date,
                specialite : Specialite,
                annonceur : User,
                candidatures : Candidature[],
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
