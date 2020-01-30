import { IHandler, ITable } from '../interfaces';

export abstract class AbstractHandler<M, R> implements IHandler<R> {
  protected nextHandler: IHandler<R> | null = null;

  protected constructor() {
    this.transform = this.transform.bind(this);
    this.setNext = this.setNext.bind(this);
    this.handle = this.handle.bind(this);
  }

  /**
   * Инициализирует обработчик, которому будет передано управление следующим
   * @param handler следующий обработчик
   * @returns следующий обработчик. Необходимо для реализации чепочки
   */
  public setNext(handler: IHandler<R>): IHandler<R> {
    this.nextHandler = handler;
    return handler;
  }

  /**
   * Инициализирует поля таблицы или модифицирует их.
   * Далее передает управление следующему обработчику, если он есть или возвращает результат
   * @param table объект таблицы
   * @returns модифицированная таблица
   */
  public handle(table: ITable<R>): ITable<R> {
    const resultTable: ITable<R> = this.transform(table);
    if (this.nextHandler) {
      return this.nextHandler.handle(resultTable);
    }

    return resultTable;
  }

  /**
   * Метод, который инициализирует поля объекта таблицы или модифицирует их
   * @param table объект таблицы
   * @returns модифицированная таблица
   */
  protected abstract transform(table: ITable<R>): ITable<R>;
}
