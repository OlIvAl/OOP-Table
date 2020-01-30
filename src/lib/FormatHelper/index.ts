import Formatter from './formatter';

export class FormatHelper {
  static formatCellValue(value: string | number, type: string, currency: string): string | number {
    switch (type) {
      case 'money':
        return Formatter.money(value, currency);
      case 'percent':
        return Formatter.decimalPercent(value);
      case 'datetime':
        return Formatter.date(value, 'dd.MM.yyyy, HH:mm');
      case 'date':
        return Formatter.date(value, 'dd.MM.yyyy');
      default:
        return value;
    }
  }
}