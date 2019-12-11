import {Injectable} from "@angular/core";

@Injectable()
export class Offre {
  lieux: string;
  description: string[];
  isFav: boolean;
  id: number;
  userId : number

  constructor(public name: string) {

  }

}
