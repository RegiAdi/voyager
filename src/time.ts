import {addDays, isAfter} from 'date-fns';

export class Time {
  now(): Date {
    return new Date();
  }

  addDays(date: Date, amount: number): Date {
    return addDays(date, amount);
  }

  isAfter(date: Date, dateToCompare: Date): boolean {
    return isAfter(date, dateToCompare);
  }
}
