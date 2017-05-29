import { Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SaqService } from '../../services/saq/saq.service';
import { Maths } from '../../../utils/maths';

const INGREDIENT_PHOTOS_PATH = '../../../assets/ingredient-photos/';

@Component({
    selector: 'app-ingredient-card',
    templateUrl: './ingredient-card.component.html',
    styleUrls: ['./ingredient-card.component.css'],
    providers: [SaqService]
})

export class IngredientCardComponent implements OnInit, OnDestroy {
    @Input() isAlcohol: boolean;
    @Input() name: string;
    @Input() quantity: number | string;
    // emits selected alcohol for aggregation in parent recipe component
    @Output() alcoholSelected: EventEmitter<Type.SelectedAlcohol> = new EventEmitter();

    subscription: Subscription = new Subscription();
    selectedResultIndex = 0;
    selectedResult: Type.Result = null;

    constructor(private saqService: SaqService) {}

    ngOnInit() {
        this.subscription = this.saqService.selectedResult
        .subscribe(result => {
            this.selectedResult = result;
            this.alcoholSelected.emit({name: this.name, selected: result});
        });

        this.saqService.listProducts(this.name);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    formattedIngredientTitle(): string {
        let formattedNum = this.quantity;

        if (typeof formattedNum === 'number') {
            formattedNum = Maths.convertDecimalToFraction(formattedNum) + ' oz. of';
        }

        return `${formattedNum} ${this.name}`;
    }

    getImageUrl(): string {
        let imageUrl = null;

        if (this.isAlcohol && this.selectedResult) {
            imageUrl = this.selectedResult.raw.tpthumbnailuri;
        }

        if (!this.isAlcohol) {
            const fileName = this.name.toLowerCase().replace(' ', '_') + '.jpg';
            imageUrl = (INGREDIENT_PHOTOS_PATH + fileName);
        }

        return imageUrl;
    }


    updateSelectedResult(num: number) {
        const results = this.saqService.results;
        if (!results) {return; }

        const maxIndex = results.length - 1;
        const newIndex = this.selectedResultIndex + num;

        if (newIndex > maxIndex) {
            this.selectedResultIndex = 0;
        } else if (newIndex < 0) {
            this.selectedResultIndex = maxIndex;
        } else {
            this.selectedResultIndex = newIndex;
        }

        this.saqService.updateSelectedResult(this.selectedResultIndex);
    }
}
