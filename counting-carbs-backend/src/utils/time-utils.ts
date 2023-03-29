import { DateTime } from 'luxon';

export function setTimeFrame(time: string) {
  let timeframe: string[] = [];
    if (time == 'today') {
        timeframe.push(transformDate());
    } else if (time == 'month') {
        timeframe = getMonths();
    } else if (time == 'year') {
        timeframe.push(getYear());
    } else if (time == 'week') {
        timeframe = getWeek();
    } else if (time == 'daily') {
        timeframe = getWeek(6);
    } else if (time == 'monthly') {
        timeframe = getMonths(12);
    } else if (time == 'weekly') {
        timeframe = getWeek(27);
    }
    else {
        timeframe.push(time);
    }
  return timeframe;
}

export function transformDate(): string {
  return DateTime.now().toFormat('yyyy-MM-dd');
}

export function getYear(): string {
  return DateTime.now().year.toString();
}

export function getMonths(monthsNumber?: number): Array<string> {
  const months: string[] = [];
  let month;
  if (monthsNumber == undefined) {
    const date = DateTime.now();
    month = date.year + '-' + correctDate(date.month);
    months.push(month);
  }
  for (let i = 0; i < monthsNumber; i++) {
    const date = DateTime.now().minus({ month: i });
    month = date.year + '-' + correctDate(date.month);
    months.push(month);
  }
  return months;
}

export function getWeek(number?: number) {
  const weekDates: string[] = [];
  if (typeof number == 'undefined') {
    const today = new Date().toDateString();
    const weekday = today.substring(0, 3);
    switch (weekday) {
      case 'Mon':
        number = 0;
        break;
      case 'Tue':
        number = 1;
        break;
      case 'Wed':
        number = 2;
        break;
      case 'Thu':
        number = 3;
        break;
      case 'Fri':
        number = 4;
        break;
      case 'Sat':
        number = 5;
        break;
      case 'Sun':
        number = 6;
        break;
    }
  }
  for (let i = 0; i <= number; i++) {
    const date = DateTime.now().minus({ days: i });
    const stringDate =
      date.year + '-' + correctDate(date.month) + '-' + correctDate(date.day);
    weekDates.push(stringDate);
  }
  return weekDates;
}

export function correctDate(date: number) {
  let dateString;
  if (date < 10) {
    dateString = '0' + date;
  } else {
    dateString = date;
  }
  return dateString;
}
