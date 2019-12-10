import { Component } from '@angular/core';

@Component({

    selector: 'page-calendrier', 
    templateUrl: 'calendrier.html'

})
export class CalendrierPage {

    today:any
    constructor() {
        this.today = new Date().toISOString(); 
    }

}