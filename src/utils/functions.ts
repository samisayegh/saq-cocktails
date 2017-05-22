export class Func {
    convertObjToArray(obj) {
        if (obj) {
            return Object.keys(obj).map(key => {
                return {name: key, quantity: obj[key]};
            });
        } else {
            return [];
        }
    };

    convertDecimalToFraction(decimal: number): {num: number, den: number} {
        return {
            num: 1,
            den: 1
        };
    }
}
