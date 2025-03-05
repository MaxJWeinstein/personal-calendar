export default class Day {
    private _date: Date;
    constructor(date: number, month: number, year: number) {
        this._date = new Date(year, month, date);
    }

    getMonth() {
        return this._date.getMonth();
    }
    getDate() {
        return this._date.getDate();
    }
    getYear() {
        return this._date.getFullYear();
    }
    getDayOfWeek() {
        return this._date.getDay();
    }
    toString() {
        let year = this.getYear().toString().padStart(4, "0");
        let month = this.getMonth().toString().padStart(2, "0");
        let date = this.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${date}`;
    }
    equals(other: Day) {
        return (
            this.getDate() === other.getDate() &&
            this.getMonth() === other.getMonth() &&
            this.getYear() === other.getYear()
        );
    }
    private jumpBy(days: number) {
        let newDay = new Day(this.getDate(), this.getMonth(), this.getYear());
        newDay._date.setDate(this.getDate() + days);
        return newDay;
    }
    nextDay() {
        return this.jumpBy(1);
    }
    prevDay() {
        return this.jumpBy(-1);
    }
}

/**
 * From https://stackoverflow.com/questions/315760/what-is-the-best-way-to-determine-the-number-of-days-in-a-month-with-javascript
 * By user GitaarLAB
 */
export function daysInMonth(month: number, year: number) {
    month++; // We accept a 0-indexed month, but the algorithm assumes 1-indexed
    return month === 2
        ? year & 3 || (!(year % 25) && year & 15)
            ? 28
            : 29
        : 30 + ((month + (month >> 3)) & 1);
}
