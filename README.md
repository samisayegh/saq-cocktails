# SaqCocktails

Find recipes for your favourite cocktails, with alcohols suggested by SAQ powered by a Coveo search API. Alter your alcohol selections to fit your budget, find out how many drinks you will be able to make, and your cost per drink!

## Setup

1. Clone the repo.
2. Install dependencies by running `npm i --no-optional`.
3. In `src/cfg/config.ts`, you will need to add a value for `COVEO_ACCESS_TOKEN` so calls to the Coveo API work.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.28.3.

## Application Structure

### Components

The application is built using four components having the following relationship:

```
App
│
└───Search Bar
│
└───Recipe
    │
	└───Ingredient Card
	│
	└───Info Card
```

### Services

The application uses two services:

1. Cocktail Service: displays a list of cocktails, and tracks the one that has been selected. The service retrieves data locally from `src/data/cocktail-recipes`; it  does not communicate with external parties.

2. Saq Service: communicates with SAQ via a Coveo search API, retrieving results for a queried alcohol category. Every alcohol Ingredient Card component subscribes to a unique Saq service instance.

### Flow

- A user searches for a cocktail recipe using the `Search Bar component` powered by `Cocktail service`.
- Upon making a selection, an event is emitted by a `Cocktail service` observable with the selected cocktail recipe.
- The `Recipe component` intercepts the event and generates as many `Ingredient Card components` as needed by the recipe. It specifies whether ingredients are alcoholic or non-alcoholic. It also creates the first `Info Card component` containing instructions on how to perpare the cocktail.
- `Ingredient Card component` displays all information related to its assigned ingredient, including the name, quantity and an image. In addition, for alcoholic ingredients, it will retrieve results using `Saq service`, and provide navigation buttons to switch between them. The active reult is sent back and aggregated in `Recipe component`.
- `Recipe component` uses the aggregated alcohol results to calculate the total price of alcohol selections, the number of cocktails that can be made, and the price per cocktail. The information is diplayed in a second `Info Card component`.

## Adding Recipes

All recipes are stored in `src/data/cocktail-recipes`. To add a new cocktail recipe, you will need to:

1. Add the name of the cocktail to the `cocktails` object.
2. Add the alcohol ingredients to the `alcohols` object if they are not already there. If the alcohol has a different name in French, also add an entry to the `alcoholsFR` object. This is needed because queries to the Coveo API need to be in French.
3. Add non-alcoholic ingredients to the `ingredients` object if they are not already there.
4. Add your recipe to the `cocktailInfos` object, by creating a new instance of the `CocktailInfo` class and associating it to your cocktail.
	- Please use a number to describe the quantity of an alcohol ingredient.
	- Non-alcoholic ingredient quantities can be a number or a string.
	- All numbers should be in ounces.

e.g. Mojito recipe

	[cocktails.MOJITO]: new CocktailInfo(
		cocktails.MOJITO, // cocktail name
		{[alcohols.WHITE_RUM]: 2}, // alcohol ingredients
		{[ingredients.CLUB_SODA]: 1, [ingredients.LIME_JUICE]: 1,  [ingredients.MINT_LEAVES]: '12', [ingredients.SUGAR]: '2 teaspoons of'}, // non-alcoholic ingredients
		'Fill a glass with ice. Crush the mint leaves to release their oils and flavour. Stir the ingredients together until the sugar has dissolved and pour into the chilled glass.') // preparation instructions

5. If you added non-alcoholic ingredients, add a .jpg or .jpeg image for each new ingredient to the `src/assets/ingredient-photos` folder. Make sure the image name matches the lowercase name of the ingredient as written in the `ingredients` object, with spaces replaced with underscores.

e.g. The image for 'Lemon juice' should be labelled 'lemon_juice'.
