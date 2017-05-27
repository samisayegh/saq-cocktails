export class Maths {
    private recurringDecimalFractionMap = [
        {decimal: 0.166, frac: '1/6'},
        {decimal: 0.333, frac: '1/3'},
        {decimal: 0.666, frac: '2/3'},
        {decimal: 0.833, frac: '5/6'}
    ];

    private screenAndConvertRecurringDecimal(num: number) {
        const error = 0.01;
        for (const item of this.recurringDecimalFractionMap) {
            if (Math.abs(num - item.decimal) < error) {
                return item.frac;
            }
        }
        return num;
    }

    convertDecimalToFraction(num: number | string): string {
        if (!num || typeof num !== 'number') {
            return null;
        }

        // if a recurring decimal, map to a fraction
        const fraction = this.screenAndConvertRecurringDecimal(num);
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

    isDecimal(num: number): boolean {
        return (num % 1 !== 0);
    };

    // returns the greatest common denominator
    gcd(a, b): number {
        if (b === 0) {
            return a;
        }
        return this.gcd(b, a % b);
    };
}
