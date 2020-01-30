import { format, parse } from 'date-fns';
import { enUS, ru } from 'date-fns/esm/locale';

interface Locales {
  [key: string]: any;
}

const locales: Locales = {
  en: enUS,
  ru: ru
};

const formatsCheckMap: { [mask: string]: RegExp } = {
  'dd.MM.yyyy': /\d\d\.\d\d\.\d\d\d\d/,
  'yyyy-MM-dd HH:mm:ss': /\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d/
};

function getFormat(date: string): string | void {
  return Object.keys(formatsCheckMap).find((key: string) => {
    return formatsCheckMap[key].test(date);
  });
}

const correctTimezoneOffset = (date: Date): Date =>
  new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

export const dateParse = (dateStr: string, formatStr: string | void): Date => {
  let date: string = dateStr;

  // small fix for datetime value, to set zero timezone
  // but if datetime has own timezone, then skip this fix
  if (/\d{4}-\d\d-\d\d(\s|T)\d\d:\d\d:\d\d$/.test(date)) {
    date = `${date.replace(' ', 'T')}.000Z`;
  }

  if (typeof formatStr === 'string') {
    return parse(date, formatStr, new Date(), { locale: locales.ru });
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    const possibleFormat = getFormat(date);

    if (possibleFormat) {
      return parse(date, possibleFormat, new Date(correctTimezoneOffset(new Date())), {
        locale: locales.ru
      });
    }
  }

  return correctTimezoneOffset(parsed);
};

export const dateFormatter = (date: number | Date | string, formatStr: string) => {
  if (date === '') return 'EMPTY DATE';
  if (typeof date === 'string') date = dateParse(date);

  return format(date, formatStr, { locale: locales.ru });
};
