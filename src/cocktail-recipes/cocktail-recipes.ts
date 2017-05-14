const alcohol = {
	CAMPARI: 'Campari',
	COGNAC: 'Cognac',
	COINTREAU: 'Cointreau',
	GIN: 'Gin',
	TEQUILA: 'Tequila',
	VERMOUTH: 'Vermouth',
	WHISKY: 'Whisky',
	WHITE_RUM: 'White rum'
}

const ingredient = {
	ANGOSTURA_BITTERS: 'Angostura bitters',
	LEMON_JUICE: 'Lemon juice',
	LIME_JUICE: 'Lime juice',
	SIMPLE_SYRUP: 'Simple syrup'
}

const cocktail = {
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
	SANGRIA: 'Sangria',
	SIDECAR: 'Sidecar'
}

class CocktailInfo {
	recipe: any = {}

	instructions: string;

	constructor(alcohols: {[key: string]: number}, other: {[key: string]: string | number}, instructions?: string) {
		this.recipe.alcohols = alcohols;
		this.recipe.other = other;
		this.instructions = instructions;
	}
}

const cocktailInfo = {
	[cocktail.DAIQUIRI]: new CocktailInfo(
		{[alcohol.WHITE_RUM]: 2},
		{[ingredient.LIME_JUICE]: 1, [ingredient.SIMPLE_SYRUP]: 0.75}
		),

	[cocktail.GIMLET]: new CocktailInfo(
		{[alcohol.GIN]: 2},
		{[ingredient.LIME_JUICE]: 0.66}
		),

	[cocktail.MARGARITA]: new CocktailInfo(
		{[alcohol.TEQUILA]: 2, [alcohol.COINTREAU]: 1},
		{[ingredient.LIME_JUICE]: 1}
		),

	[cocktail.MARTINI]: new CocktailInfo(
		{[alcohol.GIN]: 2, [alcohol.VERMOUTH]: 1},
		null
		),

	[cocktail.MANHATTAN]: new CocktailInfo(
		{[alcohol.WHISKY]: 2, [alcohol.VERMOUTH]: 1},
		{[ingredient.ANGOSTURA_BITTERS]: '2 dashes'}
		),

	[cocktail.NEGRONI]: new CocktailInfo(
		{[alcohol.GIN]: 1, [alcohol.VERMOUTH]: 1, [alcohol.CAMPARI]: 1},
		null
		),

	[cocktail.SIDECAR]: new CocktailInfo(
		{[alcohol.COGNAC]: 2, [alcohol.COINTREAU]: 0.75},
		{[ingredient.LEMON_JUICE]: 0.75}
		)
}

export {alcohol as alcohols, cocktail as cocktails, cocktailInfo}
