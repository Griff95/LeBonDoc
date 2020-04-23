import {Ad} from "../models/Ad";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AdService{

    DOMAINEMEDICAL: String[] = ["Kinésithérapeute","Médecin Généraliste","Infimier","Dentiste","Chirurgien","Anésthésiste"];
    TYPEOFFRE : String[] = ["CDD","CDI","Remplacement","Installation"];
    HEALTHSTRUCTURETYPE : String[] = ["Cabinet de groupe", "Cabinet individuelle", "Centre de santé","Centre hospitalier", "Clinique", "Maison de santé","Pharmacie","EPHAD"]

    offres$ = new Subject<Ad[]>();
    offresList: Ad[] = [];

    userAds : Ad[];
    userAds$ = new Subject<Ad[]>();

    searchResult$ = new Subject<Ad[]>();
    results: Ad[] = [];

    mostRecent$ = new Subject<Ad[]>();
    recents : Ad[] = [];

    sameSpeciality$ = new Subject<Ad[]>();
    same : Ad[] = [];


    constructor(private http: HttpClient,
                private authService : AuthService) {
    }


    emitUserAds(){
        this.userAds$.next(this.userAds);
    }

    addOffre(offre) {
        this.offresList.push(offre);
        this.emitOffres();
    }

    emitOffres(){
        this.offres$.next(this.offresList.slice());
    }

    emitSearchResults(){
        this.searchResult$.next(this.results.slice());
    }

    emitAdsMostRecent(){
        this.mostRecent$.next(this.recents.slice());
    }

    emitAdsSameMedicalField(){
        this.sameSpeciality$.next(this.same.slice());
    }

    emitSearch(){
        this.searchResult$.next(this.same.slice());
    }


    // saveData(){
    //     return new Promise((resolve, reject) => {
    //         firebase.database().ref('offres').set(this.offresList).then(
    //             (data: DataSnapshot) => {
    //                 resolve(data);
    //             })
    //             .catch(
    //                 (error) => {
    //                     reject(error);
    //                 }
    //             );
    //     });
    // }

    postAd(ad){
        return new Promise((resolve, reject) => {
            this.http.post('http://localhost:3000/api/ad/', ad).subscribe(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            )
        });
    }

    editAdDescription(id, data){
        return new Promise((resolve, reject) => {
            this.http.put('http://localhost:3000/api/ad/'+id, data).subscribe(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            )
        });
    }

    deleteAd(id) {
        return new Promise( (resolve, reject) => {
            this.http.delete('http://localhost:3000/api/ad/'+id).subscribe(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            )
        })
    }

    getAd(id) {
        return new Promise( (resolve, reject) => {
            this.http.get('http://localhost:3000/api/ad/'+id).subscribe(
                (data: Ad) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            )
        })
    }


    getUserAds() {
        return new Promise( (resolve, reject) => {
            this.http.get<[]>('http://localhost:3000/api/auth/ad/'+this.authService.getUserId()).subscribe(
                (data: []) => {
                    this.userAds = data;
                    this.emitUserAds();
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            )
        })
    }

    // retrieveData(){
    //     return new Promise((resolve, reject) => {
    //         firebase.database().ref('offres').once('value').then(
    //             (data: DataSnapshot) => {
    //                 this.offresList = this.snapshotToArray(data);
    //                 this.emitOffres();
    //                 resolve('Données récupérées avec succès !')
    //             })
    //             .catch(
    //                 (error) => {
    //                     reject(error);
    //                 }
    //             );
    //     });
    // }

    getAdsMostRecent(){
        return new Promise((resolve, reject) => {
            this.http.get('http://localhost:3000/api/ad/recent').subscribe(
                (data: any[]) => {
                    console.log(data);
                    this.recents = data;
                    this.emitAdsMostRecent();
                    resolve(data);
                },
                (error => {
                    reject(error);
                })
            )
        });
    }

    getAdsSameMedicalField(medicalFieldId){
        return new Promise((resolve, reject) => {
            this.http.get<Ad[]>('http://localhost:3000/api/ad/medicalField/'+medicalFieldId).subscribe(
                (data: Ad[]) => {
                    this.recents = data;
                    this.emitAdsSameMedicalField();
                    resolve(data);
                },
                (error => {
                    reject(error);
                })
            )
        });
    }

    search(searchFilter) {
        return new Promise((resolve, reject) => {
            this.http.post<Ad[]>('http://localhost:3000/api/ad/search/',searchFilter).subscribe(
                (data: Ad[]) => {
                    this.results = data;
                    this.emitSearch();
                    resolve(data);
                },
                (error => {
                    reject(error);
                })
            )
        });
    }

    // snapshotToArray = snapshot => {
    //     let returnArray = [];
    //     snapshot.forEach( element => {
    //         let item = element.val();
    //         item.key = element.key;
    //         returnArray.push(item);
    //     })
    //     return returnArray;
    // }
}

