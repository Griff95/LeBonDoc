import {UserProfile } from "../models/UserProfile";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class JsonService {

    medicalFields: Object[];
    medicalFields$ = new Subject<Object>();
    public DOMAINEMEDICAL: String[];

    structureTypes: Object[];
    structureTypes$ = new Subject<Object>();
    public HEALTHSTRUCTURETYPE : String[];

    adTypes: Object[];
    adTypes$ = new Subject<Object>();
    public TYPEOFFRE : String[];


    constructor(private http: HttpClient) {
    }


    emitMedicalFields(){
        this.medicalFields$.next(this.medicalFields);
    }

    emitAdTypes(){
        this.adTypes$.next(this.adTypes);
    }

    emitStructureTypes(){
        this.structureTypes$.next(this.structureTypes);
    }


    getMedicalFields(){
        return new Promise((resolve, reject) => {
            this.http.get<Object[]>("http://localhost:3000/api/json/medicalFields").subscribe(
                (data ) => {
                    this.medicalFields = data;
                    this.DOMAINEMEDICAL = data.map((el :any) => el.title);
                    this.emitMedicalFields();
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            )
        });
    }

    getStructureTypes(){
        return new Promise((resolve, reject) => {
            this.http.get<Object[]>("http://localhost:3000/api/json/structureTypes").subscribe(
                (data) => {
                    this.structureTypes = data;
                    this.HEALTHSTRUCTURETYPE = data.map((el :any) => el.title);
                    this.emitStructureTypes();
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            )
        });
    }

    findLocationByPostalCode(postalCode) {
        return new Promise((resolve, reject) => {
            this.http.get<Object[]>("http://localhost:3000/api/json/findByPostalCode/" + postalCode).subscribe(
                (localisation) => {
                    resolve(localisation);
                },
                (error) => {
                    reject(error);
                }
            )
        });
    }

    getAdTypes() {
        return new Promise((resolve, reject) => {
            this.http.get<Object[]>("http://localhost:3000/api/json/adTypes").subscribe(
                (data) => {
                    this.adTypes = data;
                    this.TYPEOFFRE = data.map((el :any) => el.title);
                    this.emitAdTypes();
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            )
        });
    }
}
