declare const $: any;

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

    // shrinks font-size of text until is fits a specified maxHeight
    static resizeText(selector: string, maxHeight: number) {
        $(() => {
            while ($(selector).height() > maxHeight) {
                const currentFontSize = parseInt($(selector).css('font-size'), 10);
                $(selector).css('font-size', (currentFontSize - 1) + 'px');
            }
        });
    }
}
