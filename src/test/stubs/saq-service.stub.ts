import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SaqAlcoholResult } from '../saq-cocktail-test.classes';

export class SaqServiceStub {
    results = [];
    selectedResult = new BehaviorSubject<Type.Result>(null);

    constructor(alcoholResults: SaqAlcoholResult[]) {
        this.results = alcoholResults;
    }

    listProducts() {
        this.updateSelectedResult(0);
    }

    updateSelectedResult(index) {
        const selected = this.results[index];
        this.selectedResult.next(selected);
    }
}
