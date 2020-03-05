import {Injectable} from "@angular/core";

@Injectable()
export class HealthStructure {
    constructor(name: string,
                structureType: string,
                city: string,
                department: string,
                postalCode: number) {
    }

}