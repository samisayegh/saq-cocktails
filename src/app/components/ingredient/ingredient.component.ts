import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-ingredient',
    templateUrl: './ingredient.component.html',
    styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
    @Input() isAlcohol: boolean;
    @Input() name: string;
    @Input() quantity: number | string;

    constructor() { }

    ngOnInit() {
    }

}
