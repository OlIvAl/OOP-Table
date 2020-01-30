import { IModelsToRowsConverter, ITable, ITableBuilder } from './interfaces';
import { Table } from './Table';
import { InitColumnsHandler } from './tableHandlers/InitColumnsHandler';
import { InitRowsHandler } from './tableHandlers/InitRowsHandler';
import { InitFooterRowHandler } from './tableHandlers/InitFooterRowHandler';

export class TableBuilder<M, R = M> implements ITableBuilder<M, R> {
  /**
   * готовый для использования в компоненте ReactTable объект таблицы
   */
  private table: ITable<R>;
  /**
   * ключи колонок
   * @default []
   */
  private columnKeys: (keyof R)[];
  /**
   * модели для дальнейшего преобразования их в строки
   * @default []
   */
  private models: M[];
  /**
   * функция для преобразования моделей бизнесс данных в объекты строк
   * @default null
   */
  private modelsToRowsConverter: IModelsToRowsConverter<M, R> | null;
  /**
   * Объект строки футера
   * @default null
   */
  private footerRow: Record<keyof R, string> | null;

  constructor() {
    this.table = new Table();
    this.columnKeys = [];
    this.models = [];
    this.modelsToRowsConverter = null;
    this.footerRow = null;

    this.reset = this.reset.bind(this);
    this.setColumnKeys = this.setColumnKeys.bind(this);
    this.setModels = this.setModels.bind(this);
    this.setModelsToRowsConverter = this.setModelsToRowsConverter.bind(this);
    this.setFooter = this.setFooter.bind(this);
    this.getTable = this.getTable.bind(this);
  }

  reset(): void {
    this.table = new Table();
    this.columnKeys = [];
    this.models = [];
    this.modelsToRowsConverter = null;
    this.footerRow = null;
  }

  setColumnKeys(columnKeys: string[]): void {
    if (!columnKeys.length) {
      throw Error('You must to set array of column keys. You set empty array.');
    }
    this.columnKeys = columnKeys as (keyof R)[];
  }

  setModels(models: M[]): void {
    this.models = models;
  }

  setModelsToRowsConverter(modelsToRowsConverter: IModelsToRowsConverter<M, R>): void {
    this.modelsToRowsConverter = modelsToRowsConverter;
  }

  setFooter(footerRow: Record<keyof R, string> | null): void {
    this.footerRow = footerRow;
  }

  getTable(): ITable<R> {
    if (!this.columnKeys.length) {
      throw Error('You have not set column keys');
    }

    const initColumnsHandler = new InitColumnsHandler<M, R>(this.columnKeys);
    const initRowsHandler = new InitRowsHandler<M, R>(this.models, this.modelsToRowsConverter);
    const initFooterRowHandler = new InitFooterRowHandler<M, R>(this.footerRow);

    initColumnsHandler.setNext(initRowsHandler).setNext(initFooterRowHandler);

    return initColumnsHandler.handle(this.table);
  }
}
