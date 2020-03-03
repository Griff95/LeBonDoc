import {Injectable} from "@angular/core";
import {User} from "firebase";
import {Specialite} from "../models/Specialite";
import {Offre} from "../models/Offre";


@Injectable()
export class UserProfil {


  userId:string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  dateDeNaissance: Date;
  isVerified: boolean;
  offres: Offre[];
  favoris: Offre[];
  specialite: string;
  codePostal: number;
  unMotSurMoi: string;


  constructor() {

  }

}
