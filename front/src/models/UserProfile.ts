import {Injectable} from "@angular/core";
import {Ad} from "./Ad";
import {AdChat} from "./AdChat";
import {Adapter} from "../app/core/adapter"


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

/**
@Injectable()
export class UserProfilAdapter implements Adapter<UserProfile> {
  adapt(item: any): UserProfile {
    let healthS;
    if(item.healthStructure) {
      healthS = new HealthStructure(
          item.healthStructure.name,
          item.healthStructure.structureType,
          item.healthStructure.city,
          item.healthStructure.department,
          item.healthStructure.postalCode)
    } else {
      healthS = undefined;
    }
    let u = new UserProfile(
        item.email,
        item.name,
        item.lastName,
        item.phone,
        item.postalCode,
        item.city,
        item.department,
        item.medicalField,
        item.presentation,
        healthS,
        item.ads,
        item.favorites,
        item.chats,
        new Date(item.updateAt),
        new Date(item.createdAt)
    );
    return u;

  }
}
*/