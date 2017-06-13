import { Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Config } from '../../../cfg/config';
import { SaqService } from '../../services/saq/saq.service';
import { Func } from '../../../utils/functions';
import { Maths } from '../../../utils/maths';

@Component({
    selector: 'app-ingredient-card',
    templateUrl: './ingredient-card.component.html',
    styleUrls: ['./ingredient-card.component.css'],
    providers: [SaqService]
})

export class IngredientCardComponent implements OnInit, OnDestroy {
    @Input() index: number;
    @Input() isAlcohol: boolean;
    @Input() name = '';
    @Input() quantity: number | string;
    // emits selected alcohol for aggregation in parent recipe component
    @Output() alcoholSelected: EventEmitter<Type.SelectedAlcohol> = new EventEmitter();

    // IngredientCard component instances are uniquely identified for jQuery by an id composed of "alcohol/ingredient + index"
    private id: string;
    private subscription: Subscription = new Subscription();
    private selectedResultIndex = 0;
    selectedResult: Type.Result = null;

    constructor(private saqService: SaqService) {}

    ngOnInit() {
        this.id = (this.isAlcohol) ? 'alcohol' + this.index : 'ingredient' + this.index;
        this.resizeCardText();
        this.subscribeToSaqResult();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    subscribeToSaqResult() {
        if (this.isAlcohol) {
            this.subscription = this.saqService.selectedResult
            .subscribe(result => {
                this.selectedResult = result;
                this.alcoholSelected.emit({name: this.name, selected: result});
            });

            this.saqService.listProducts(this.name);
        }
    }

    // resizing card title and alcohol bottle name font size via jquery to fit in allocated space
    resizeCardText() {
        const maxHeight = (this.isAlcohol) ? 28 : 56;

        Func.resizeText(`#${this.id} .title-text`, maxHeight);
        Func.resizeText(`#${this.id} .alcohol-bottle-name`, 36);
    }

    formattedIngredientTitle(): string {
        let formattedNum = this.quantity;

        if (typeof formattedNum === 'number') {
            formattedNum = Maths.convertDecimalToFraction(formattedNum) + ' oz. of';
        }

        return `${formattedNum} ${this.name}`;
    }

    get imageUrl() {
        let imageUrl = null;

        if (this.isAlcohol && this.selectedResult) {
            imageUrl = this.selectedResult.raw.tpthumbnailuri;
        }

        if (!this.isAlcohol) {
            // TODO: handle 404 errors somehow
            const fileName = this.name.toLowerCase().replace(' ', '_') + '.jpg';
            imageUrl = (Config.INGREDIENT_PHOTOS_PATH + fileName);
        }

        return (imageUrl) ? imageUrl : (Config.INGREDIENT_PHOTOS_PATH + 'no_image.jpg');
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
