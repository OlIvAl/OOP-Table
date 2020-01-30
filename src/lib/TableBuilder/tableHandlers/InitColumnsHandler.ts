import { AbstractHandler } from './AbstractHandler';
import { IColumn, ITable } from '../interfaces';

export class InitColumnsHandler<M, R> extends AbstractHandler<M, R> {
  /**
   * ключи колонок
   */
  private columnKeys: (keyof R)[];

  constructor(columnKeys: (keyof R)[]) {
    super();

    this.columnKeys = columnKeys;

    this.makeColumn = this.makeColumn.bind(this);
  }

  /**
   * Инициализирует поле колонок таблицы
   * @param table объект таблицы
   * @returns модифицированная таблица
   */
  protected transform(table: ITable<R>): ITable<R> {
    table.columns = this.columnKeys.reduce<Record<keyof R, IColumn<R>>>(
      (record, key) => ({ ...record, [key]: this.makeColumn(key) }),
      {} as Record<keyof R, IColumn<R>>
    );
    return table;
  }

  /**
   * Преобразует ключ колонки в обЪект колонки
   * @param columnKey ключ колонки
   * @returns обЪект колонки
   */
  private makeColumn(columnKey: keyof R): IColumn<R> {
    return {
      accessor: columnKey,
      headerClassName: columnKey
    };
  }
}
