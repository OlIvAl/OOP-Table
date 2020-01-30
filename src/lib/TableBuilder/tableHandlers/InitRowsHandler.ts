import { AbstractHandler } from './AbstractHandler';
import { IModelsToRowsConverter, ITable } from '../interfaces';

export class InitRowsHandler<M, R> extends AbstractHandler<M, R> {
  /**
   * модели для дальнейшего преобразования их в строки
   * @default []
   */
  private models: M[];
  /**
   * функция для преобразования моделей бизнесс данных в объекты строк
   * @default null
   */
  private readonly modelsToRowsConverter: IModelsToRowsConverter<M, R> | null;

  constructor(models: M[], modelsToRowsConverter: IModelsToRowsConverter<M, R> | null) {
    super();

    this.models = models;
    this.modelsToRowsConverter = modelsToRowsConverter;

    this.makeRow = this.makeRow.bind(this);
  }

  /**
   * Инициализирует поле строк объекта таблицы
   * @param table объект таблицы
   * @returns модифицированная таблица
   */
  protected transform(table: ITable<R>): ITable<R> {
    table.rows = this.models.map<R>((model): R => this.makeRow(model, this.modelsToRowsConverter));
    return table;
  }

  /**
   * Преобразует модель бизнесс данных в обЪект строки
   * @param model модель бизнесс данных
   * @param modelsToRowsConverter функция для преобразования моделей бизнесс данных в объекты строк
   * @returns обЪект строки
   */
  private makeRow(model: M, modelsToRowsConverter?: IModelsToRowsConverter<M, R> | null): R {
    if (!modelsToRowsConverter) {
      return (model as unknown) as R;
    }

    return modelsToRowsConverter(model);
  }
}
