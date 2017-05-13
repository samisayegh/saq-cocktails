import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Config } from '../../../cfg/config';

const token = Config.COVEO_ACCESS_TOKEN;

@Injectable()
export class SaqService {
    url: string = null;

    constructor(private http: Http) {
        if (token) {
            this.url = `https://cloudplatform.coveo.com/rest/search?access_token=${token}&q=@tpcepagenomsplitgroup==Merlot`;
        } else {
            console.log('%c We could not find a Coveo access token. Api calls will not succeed.', 'color: red');
        }
    }

    listProducts() {
        return this.http.get(this.url).map(res => res.json());
    }
}
