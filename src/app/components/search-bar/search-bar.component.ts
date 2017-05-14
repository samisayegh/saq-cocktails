import { Component } from '@angular/core';
import { alcohols, cocktails} from '../../../cocktail-recipes/cocktail-recipes';

@Component({
    selector: 'search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
    constructor() {}

    query: string = null;

    options: string[] = Object.keys(alcohols).map(key => alcohols[key]).concat(Object.keys(cocktails).map(key => cocktails[key]));
    filteredOptions: string[] = [];

    queryUpdated(val: string) {
    	this.query = val;
    	this.filteredOptions = this.filter(val);
    }
    
    filter(val: string): string[]{
    	return (val) ? this.options.filter(option => option.indexOf(val) !== -1) : this.options;
    }
}
