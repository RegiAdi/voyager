import {addDays} from 'date-fns';

export class Time {
  now(): Date {
    return new Date();
  }

  addDays(date: Date, amount: number): Date {
    return addDays(date, amount);
  }
}
