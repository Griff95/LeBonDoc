import {Injectable} from "@angular/core";

@Injectable()
export class Offre {
  lieux: string;
  description: string[];
  isFav: boolean;

  constructor(public name: string) {

  }

}
