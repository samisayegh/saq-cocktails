import { Func } from '../utils/functions';

const UNITS = {
    MILLILITRES: 'ml',
    LITRES: 'L'
};
const OUNCE_MILLILITRE_CONV = 29.5735;

export class Maths {
    private static recurringDecimalFractionMap = [
        {decimal: 0.166, frac: '1/6'},
        {decimal: 0.333, frac: '1/3'},
        {decimal: 0.666, frac: '2/3'},
        {decimal: 0.833, frac: '5/6'}
    ];

    private static convertIfRecurringDecimal(num: number) {
        const error = 0.01;
        for (const item of this.recurringDecimalFractionMap) {
            if (Math.abs(num - item.decimal) < error) {
                return item.frac;
            }
        }
        return num;
    }

    private static isDecimal(num: number): boolean {
        return (num % 1 !== 0);
    };

    // returns the greatest common denominator
    private static gcd(a, b): number {
        if (b === 0) {
            return a;
        }
        return this.gcd(b, a % b);
    };

    static convertDecimalToFraction(num: number | string): string {
        if (!num || typeof num !== 'number') {
            return '';
        }

        // if a recurring decimal, map to a fraction
        const fraction = this.convertIfRecurringDecimal(num);
        if (typeof fraction === 'string') {
            return fraction;
        }

        let den = 1;

        // multiply by 10 until number is no longer a decimal
        while (this.isDecimal(num)) {
            num *= 10;
            den *= 10;
        }

        const gcd = this.gcd(num, den);

        // divide by the greatest common denominator
        num /= gcd;
        den /= gcd;

        return (den === 1) ? `${num}` : `${num}/${den}`;
    };

    static formatAsPrice(num: number): string {
        return ((num * 100) / 100).toFixed(2);
    }

    static convertLitresToOunces(vol: string): number {
        vol = Func.replaceCommasWithPeriods(vol);

        // determine units
        let units = null;

        if (vol.indexOf(UNITS.MILLILITRES) !== -1) {
            units = UNITS.MILLILITRES;
        } else if (vol.indexOf(UNITS.LITRES) !== -1) {
            units = UNITS.LITRES;
        } else {
            return -1;
        }

        vol = Maths.sanitizeMultiPackFormat(vol);
        // extract number from string
        let volume = parseFloat(vol);

        if (isNaN(volume)) {
            return -1;
        }
        // convert to ml if needed
        if (units === UNITS.LITRES) {
            volume *= 1000;
        }

        // convert ml to ounces
        const ounces = (volume / OUNCE_MILLILITRE_CONV);

        // round to two decimal places
        return Maths.twoDecimalPlaces(ounces);
    }

    static twoDecimalPlaces(num: number): number {
        return (Math.round(num * 100) / 100);
    }

    // determines the volume of a multipack (e.g. 4 X 330 ml should return 1320 ml)
    private static sanitizeMultiPackFormat(vol: string): string {
        const packSymbol = 'X';

        if (vol.indexOf(packSymbol) !== -1) {
            const packVols = vol.split(packSymbol);

            if (packVols.length === 2) {
                const vol1 = parseFloat(packVols[0]);
                const vol2 = parseFloat(packVols[1]);
                const totalVol = vol1 * vol2;

                if (!isNaN(totalVol)) {
                    const units = vol.split(' ').pop();
                    vol = `${totalVol} ${units}`;
                }
            }
        }

        return vol;
    }
}
