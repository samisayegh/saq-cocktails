export class Func {
    static ingredientObjToArray(obj): {name: string, quantity: string | number}[] {
        if (obj) {
            return Object.keys(obj).map(key => {
                return {name: key, quantity: obj[key]};
            });
        } else {
            return [];
        }
    };

    static replaceCommasWithPeriods(input: string): string {
        return input.replace(',', '.');
    }
}
