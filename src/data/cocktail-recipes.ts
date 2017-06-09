import { Func } from '../utils/functions';

const alcohols = {
    CAMPARI: 'Campari',
    COGNAC: 'Cognac',
    COINTREAU: 'Cointreau',
    DARK_RUM: 'Dark rum',
    GIN: 'Gin',
    TEQUILA: 'Tequila',
    TRIPLE_SEC: 'Triple sec',
    VERMOUTH: 'Vermouth',
    VODKA: 'Vodka',
    WHISKY: 'Whisky',
    WHITE_RUM: 'White rum'
};

// French translations of alcohol names, needed for SAQ Service query
const alcoholsFR = {
    [alcohols.DARK_RUM]: 'Rhum brun',
    [alcohols.WHITE_RUM]: 'Rhum blanc'
};

const ingredients = {
    ANGOSTURA_BITTERS: 'Angostura bitters',
    CLUB_SODA: 'Club soda',
    CRANBERRY_JUICE: 'Cranberry juice',
    COCONUT_CREAM: 'Coconut cream',
    LEMON_JUICE: 'Lemon juice',
    LIME_JUICE: 'Lime juice',
    MINT_LEAVES: 'Mint leaves',
    PEPPER: 'Pepper',
    PINEAPPLE: 'Pineapple',
    PINEAPPLE_JUICE: 'Pineapple juice',
    SALT: 'Salt',
    SIMPLE_SYRUP: 'Simple syrup',
    SUGAR: 'Sugar',
    TABASCO_SAUCE: 'Tabasco sauce',
    TOMATO_JUICE: 'Tomato juice',
    TONIC_WATER: 'Tonic water',
    WORCESTERSHIRE_SAUCE: 'Worcestershire sauce'
};

const cocktails = {
    BLOODY_MARY: 'Bloody mary',
    COSMOPOLITAN: 'Cosmopolitan',
    DAIQUIRI: 'Daiquiri',
    GIMLET: 'Gimlet',
    GIN_AND_TONIC: 'Gin and tonic',
    MANHATTAN: 'Manhattan',
    MARGARITA: 'Margarita',
    MARTINI: 'Martini',
    MOJITO: 'Mojito',
    NEGRONI: 'Negroni',
    PINA_COLADA: 'Pina colada',
    SIDECAR: 'Sidecar'
};

class CocktailInfo {
    name: string;
    recipe: Type.Recipe = {
        alcohols: null,
        other: null
    };
    instructions: string;

    constructor(name: string, alcoholIngredients: Type.IngredientObj, other: Type.IngredientObj, instructions: string) {
        this.name = name;
        this.recipe.alcohols = Func.ingredientObjToArray(alcoholIngredients) ;
        this.recipe.other = Func.ingredientObjToArray(other);
        this.instructions = instructions;
    }

    // searches alcohols in recipe by name and returns ingredient if found
    getAlcoholIngredient(name: string): Type.Ingredient {
        for (const alcohol of this.recipe.alcohols) {
            if (alcohol.name === name) {
                return alcohol;
            }
        }

        return null;
    }
}

// All recipe numbers are in ounces. If a number is not in ounces, it is stored as a string.
const cocktailInfos = {
    [cocktails.BLOODY_MARY]: new CocktailInfo(
        cocktails.BLOODY_MARY,
        {[alcohols.VODKA]: 1},
        {[ingredients.TOMATO_JUICE]: 3, [ingredients.LEMON_JUICE]: '1 lemon worth of', [ingredients.WORCESTERSHIRE_SAUCE]: '1/2 teaspoon', [ingredients.TABASCO_SAUCE]: '3 drops', [ingredients.PEPPER]: 'some', [ingredients.SALT]: 'some'},
        'Rub lemon around rim of glass then twist on a plate of salt so it sticks. Mix ingredients and pour in glass. Garnish with lemon wedge, celery stalk and/or green onion.'
        ),

    [cocktails.COSMOPOLITAN]: new CocktailInfo(
        cocktails.COSMOPOLITAN,
        {[alcohols.VODKA]: 1, [alcohols.TRIPLE_SEC]: 0.25},
        {[ingredients.LIME_JUICE]: 0.25, [ingredients.CRANBERRY_JUICE]: 0.25},
        'Shake ingredients with ice until chilled. Strain into a cocktail glass. Garnish with a lime wedge.'
        ),

    [cocktails.DAIQUIRI]: new CocktailInfo(
        cocktails.DAIQUIRI,
        {[alcohols.WHITE_RUM]: 2},
        {[ingredients.LIME_JUICE]: 1, [ingredients.SIMPLE_SYRUP]: 0.75},
        'Combine ingredient in a mixing glass with ice and shake well. Strain into a coupe.'
        ),

    [cocktails.GIMLET]: new CocktailInfo(
        cocktails.GIMLET,
        {[alcohols.GIN]: 2},
        {[ingredients.LIME_JUICE]: 0.66},
        'Shake well with cracked ice, then strain into a chilled cocktail glass.'
        ),

    [cocktails.GIN_AND_TONIC]: new CocktailInfo(
        cocktails.GIN_AND_TONIC,
        {[alcohols.GIN]: 1},
        {[ingredients.TONIC_WATER]: 1},
        'Pour over ice, garnish with lime wedge'
        ),

    [cocktails.MANHATTAN]: new CocktailInfo(
        cocktails.MANHATTAN,
        {[alcohols.WHISKY]: 2, [alcohols.VERMOUTH]: 1},
        {[ingredients.ANGOSTURA_BITTERS]: '2 dashes of'},
        'Stir the ingredients with cracked ice, then strain into in a chilled coupe. Garnish with an orange twist or brandied cherry.'
        ),

    [cocktails.MARGARITA]: new CocktailInfo(
        cocktails.MARGARITA,
        {[alcohols.TEQUILA]: 2, [alcohols.COINTREAU]: 1},
        {[ingredients.LIME_JUICE]: 1},
        'Rub a lime wedge over the rim of a glass then twist on a plate of coarse salt so it attaches. Shake the ingredients with cracked ice, then strain into a glass over ice.'
        ),

    [cocktails.MARTINI]: new CocktailInfo(
        cocktails.MARTINI,
        {[alcohols.GIN]: 2, [alcohols.VERMOUTH]: 1},
        null,
        'Add contents to ice-filled mixing glass or metal shaker. Stir, don’t shake, for about 10 seconds. Strain into a coupe or cocktail glass and garnish with a lemon peel.'
        ),

    [cocktails.MOJITO]: new CocktailInfo(
        cocktails.MOJITO,
        {[alcohols.WHITE_RUM]: 2},
        {[ingredients.CLUB_SODA]: 1, [ingredients.LIME_JUICE]: 1,  [ingredients.MINT_LEAVES]: '12', [ingredients.SUGAR]: '2 teaspoons of'},
        'Fill a glass with ice. Crush the mint leaves to release their oils and flavour. Stir the ingredients together until the sugar has dissolved and pour into the chilled glass.'),

    [cocktails.NEGRONI]: new CocktailInfo(
        cocktails.NEGRONI,
        {[alcohols.GIN]: 1, [alcohols.VERMOUTH]: 1, [alcohols.CAMPARI]: 1},
        null,
        'Stir with ice for 20-30 seconds. Strain into coupe glass. Garnish with orange peel.'
        ),

    [cocktails.PINA_COLADA]: new CocktailInfo(
        cocktails.PINA_COLADA,
        {[alcohols.WHITE_RUM]: 0.75, [alcohols.DARK_RUM]: 0.5},
        {[ingredients.COCONUT_CREAM]: 1, [ingredients.PINEAPPLE_JUICE]: 1, [ingredients.PINEAPPLE]: '1/2 cup frozen diced'},
        'Place ingredients along with 3/4 cup of ice into a blender. Blend until smooth and frosty. Pour drink into a glass and garnish with a pineapple slice.'
        ),

    [cocktails.SIDECAR]: new CocktailInfo(
        cocktails.SIDECAR,
        {[alcohols.COGNAC]: 2, [alcohols.COINTREAU]: 0.75},
        {[ingredients.LEMON_JUICE]: 0.75},
        'Twist the rim of a coupe into a plate of sugar so it attaches to the glass’s rim. Add all ingredients to a cocktail shaker with ice and shake until chilled. Strain into sugar-rimmed coupe and garnish with an orange peel.'
        )
};

export { alcohols, alcoholsFR, cocktails, cocktailInfos, CocktailInfo }
