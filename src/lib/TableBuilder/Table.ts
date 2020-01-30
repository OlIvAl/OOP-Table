import { IColumn, ITable } from './interfaces';

export class Table<R> implements ITable<R> {
  columns: Record<keyof R, IColumn<R>> | null = null;
  rows: R[] = [];
  footerRow: Record<keyof R, string> | null = null;
}
