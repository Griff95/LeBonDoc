import {Injectable} from "@angular/core";
import {Ad} from "./Ad";
import {AdChat} from "./AdChat";

@Injectable()
export class UserProfile {

  public email: string;
  public name: string;
  public lastName: string;
  public phone: string;
  public postalCode: number;
  public city: string;
  public department: string;
  public region: string;
  public medicalField: string;
  public presentation: string;
  public 	healthStructure: {
    name: string;
    structureType: string;
    postalCode: number;
    city: string;
    department: string;
  };
  public ads: Ad[];
  public favorites: Ad[];
  public chats: AdChat[];
  public editedAt: Date;
  public createAt: Date;

  constructor() {}

}