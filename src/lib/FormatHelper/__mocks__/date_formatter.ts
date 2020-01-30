import { format, parse } from 'date-fns';

const formatsCheckMap: { [mask: string]: RegExp } = {
  'dd.MM.yyyy': /\d\d\.\d\d\.\d\d\d\d/,
  'yyyy-MM-dd HH:mm:ss': /\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d/
};

function getFormat(date: string): string | void {
  return Object.keys(formatsCheckMap).find((key: string) => {
    return formatsCheckMap[key].test(date);
  });
}

export const dateParse = (date: string, formatStr: string | void): Date => {
  if (typeof formatStr === 'string') {
    return parse(date, formatStr, new Date());
  }

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    const possibleFormat = getFormat(date);

    if (possibleFormat) {
      return parse(date, possibleFormat, new Date());
    }
  }

  return parsed;
};

export const dateFormatter = (date: number | Date | string, formatStr: string) => {
  if (date === '') return 'EMPTY DATE';
  if (typeof date === 'string') date = dateParse(date);

  return format(date, formatStr);
};
