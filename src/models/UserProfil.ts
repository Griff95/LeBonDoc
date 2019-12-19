import {Injectable} from "@angular/core";
import {User} from "firebase";
import {Specialite} from "../models/Specialite";
import {Offre} from "../models/Offre";
import {Annonce} from "../models/Annonce";

@Injectable()
export class UserProfil {
  user:User;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  dateDeNaissance: Date;
  isVerified: boolean;
  offres: Offre[];
  favoris: Annonce[];
  specialite: Specialite;
  codePostal: number;
  unMotSurMoi: string;


  constructor() {

  }

}
