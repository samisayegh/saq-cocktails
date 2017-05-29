import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Config } from '../../../cfg/config';

const token = Config.COVEO_ACCESS_TOKEN;

@Injectable()
export class SaqService {
    url: string = `https://cloudplatform.coveo.com/rest/search?access_token=${token}&`;
    results: Type.Result[] = [];
    selectedResult: BehaviorSubject<Type.Result> = new BehaviorSubject<Type.Result>(null);

    constructor(private http: Http) {
        if (!token) {
            console.log('%c We could not find a Coveo access token. Api calls will not succeed.', 'color: red');
        }
    }

    listProducts(name: string) {
        console.log(`listing products with name ${name}`);
        return this.http.get(this.url + `q=@tpcategorie==${name}`)
        .map(res => res.json())
        .subscribe(
            (response: Type.CoveoResponse) => {
                if (response) {
                    this.results = response.results;
                    this.updateSelectedResult(0)
                }
        });
    }

    updateSelectedResult(index: number) {
        let selected = this.results[index];
        
        if (selected) {
            this.selectedResult.next(selected);
        }
    }
}
