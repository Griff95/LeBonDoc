import {Injectable} from "@angular/core";
import {Ad} from "./Ad";
import {AdChat} from "./AdChat";
import {Adapter} from "../app/core/adapter"
import {HealthStructure} from "./HealthStructure";


@Injectable()
export class UserProfile {

  constructor(
    email: string,
    name: string,
    lastName: string,
    phone: string,
    postalCode: number,
    city: string,
    department: string,
    medicalField: string,
    presentation: string,
    healthStructure: HealthStructure,
    ads: Ad[],
    favorites: Ad[],
    chats: AdChat[],
    editedAt: Date,
    createAt: Date
  ) {}

}

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