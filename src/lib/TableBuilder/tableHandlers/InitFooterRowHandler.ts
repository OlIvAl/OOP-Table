import { AbstractHandler } from './AbstractHandler';
import { ITable } from '../interfaces';

export class InitFooterRowHandler<M, R> extends AbstractHandler<M, R> {
  /**
   * Объект строки футера
   */
  private readonly footerRow: Record<keyof R, string> | null;

  constructor(footerRow: Record<keyof R, string> | null) {
    super();

    this.footerRow = footerRow;
  }

  /**
   * Инициализирует поле футера таблицы, если значение передано
   * @param table таблица
   * @returns модифицированная таблица
   */
  protected transform(table: ITable<R>): ITable<R> {
    if (!this.footerRow) {
      return table;
    }

    table.footerRow = this.footerRow;
    return table;
  }
}
