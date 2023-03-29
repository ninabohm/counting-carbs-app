import { DateTime } from 'luxon';
import {
  correctDate,
  getMonths,
  getWeek,
  getYear,
  transformDate,
} from './time-utils';

describe('time-utils', () => {
  it('should return the current date in string format', () => {
    const result = transformDate();
    expect(result.length).toEqual(10);
  });

  it('should return the current year in string format', () => {
    const result = getYear();
    const date = DateTime.now();
    expect(result).toEqual(date.year.toString());
  });

  it('should return the current month in string format', () => {
    const result = getMonths();
    const date = DateTime.now();
    const expected = date.year + '-' + correctDate(date.month);
    expect(result[0]).toEqual(expected);
  });

  it('should return an array of months according to the given lengths', () => {
    const result = getMonths(3);
    expect(result.length).toEqual(3);
  });

  it('should return an array with the number of Dates according to the given length', () => {
    const result = getWeek(6);
    expect(result.length).toEqual(7);
  });
});
