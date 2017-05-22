import { Component, OnInit, Input } from '@angular/core';

import { SaqService } from '../../services/saq/saq.service';

@Component({
    selector: 'app-ingredient',
    templateUrl: './ingredient.component.html',
    styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
    @Input() isAlcohol: boolean;
    @Input() name: string;
    @Input() quantity: number | string;
    INGREDIENT_PHOTOS_PATH: string = '../../../assets/ingredient-photos/';

    constructor(private saqService: SaqService) { }

    ngOnInit() {
    }

    getImagePath(): string{
        if (!this.isAlcohol) {
            const fileName = this.name.toLowerCase().replace(' ', '_') + '.jpg';
            return (this.INGREDIENT_PHOTOS_PATH + fileName);
        }
        
        return this.INGREDIENT_PHOTOS_PATH + 'mint_leaves.jpg';
    }

}
