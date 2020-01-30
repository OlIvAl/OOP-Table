import numeral from 'numeral';
import { dateFormatter } from './date_formatter';

const numeralOptions: any = {
  delimiters: {
    thousands: '\u00A0',
    decimal: '.'
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  ordinal: function(number: any) {
    return number === 1 ? 'er' : 'ème';
  }
};

numeral.register('locale', 'rub', {
  ...numeralOptions,
  currency: {
    symbol: '\u202F₽'
  }
});

numeral.register('locale', 'eur', {
  ...numeralOptions,
  currency: {
    symbol: '\u202F€'
  }
});

numeral.register('locale', 'usd', {
  ...numeralOptions,
  currency: {
    symbol: '\u202F$'
  }
});

interface IndexSignature {
  [key: string]: any;
}

export default class Formatter implements IndexSignature {
  [key: string]: any;

  static number(value: string | number | null): string {
    return numeral(value).format('0,0');
  }

  static money(value: string | number | null, currency: string = 'rub'): string {
    numeral.locale(currency);
    const result = numeral(value).format('0,0.00$');
    return result.replace('.00', '');
  }

  static date(value: Date | string | number, format: string): string {
    return dateFormatter(value, format);
  }

  static percent(value: string | number | null): string {
    return numeral(value).format('0.00%');
  }
  static decimalPercent(value: string | number | null): string {
    return `${numeral(value).format('0.00')}%`;
  }
  static time(value: string | number | null): string {
    return numeral(value).format('00:00');
  }
}
