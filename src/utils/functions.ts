export class Func {
    convertObjToArray(obj): {name: string, quantity: string | number}[] {
        if (obj) {
            return Object.keys(obj).map(key => {
                return {name: key, quantity: obj[key]};
            });
        } else {
            return [];
        }
    };
}
