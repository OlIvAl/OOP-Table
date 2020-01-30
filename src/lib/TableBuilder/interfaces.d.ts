/**
 * Колонка в компоненте ReactTable
 */
export interface IColumn<R> {
  /**
   * Ключ доступа к колонке ы таблице
   */
  accessor: keyof R;
  /**
   * Класс колонки таблицы
   */
  headerClassName: keyof R;
}

/**
 * Данные для компонента ReactTable
 * @param R Объект строки
 */
export interface ITable<R> {
  /**
   * Map обЪектов колонок
   */
  columns: Record<keyof R, IColumn<R>> | null;
  /**
   * Массив обЪектов строк
   */
  rows: R[];
  footerRow: Record<keyof R, string> | null;
}

/**
 * функция для преобразования моделей бизнесс данных в объекты строк
 * @param M Объект модели бизнесс данных
 * @param R Объект строки
 */
type IModelsToRowsConverter<M, R> = (model: M) => R;
/*
/!**
 * фабрика для преобразования моделей бизнесс данных в объекты строк
 * @param M Объект модели бизнесс данных
 * @param R Объект строки
 *!/
interface IModelsToRowsFabric<M, R> {
  getRow: () => R;
}
*/

export interface IHandler<R> {
  setNext(handler: IHandler): IHandler;

  handle(request: ITable<R>): ITable<R>;
}

/**
 * Универсальный конструктор таблиц
 * @param M Объект модели бизнесс данных
 * @param R Объект строки
 */
export interface ITableBuilder<M, R> {
  /**
   * Сетит ключи колонок для дальнейшего построения объектов колонок
   * @param {string[]} columnKeys ключи колонок
   */
  setColumnKeys: (columnKeys: string[]) => void;
  /**
   * Сетит бизнесс модели для дальнейшего преобразования их в строки
   * @param models модели для дальнейшего преобразования их в строки
   */
  setModels: (models: M[]) => void;
  /**
   * Сетит функцию для преобразования моделей бизнесс данных в объекты строк
   * @param modelsToRowsConverter функция для преобразования моделей бизнесс данных в объекты строк
   */
  setModelsToRowsConverter: (modelsToRowsConverter: IModelsToRowsConverter<M, R>) => void;
  /**
   * Сетит данные для строки футера
   * @param footerRow данные для строки футера
   */
  setFooter: (footerRow: Record<keyof R, string> | null) => void;

  /**
   * Возвращает готовый для использования в компоненте ReactTable объект таблицы
   * @returns готовый для использования в компоненте ReactTable объект таблицы
   */
  getTable: () => ITable<R>;
  /**
   * Ресет начальных значений
   */
  reset: () => void;
}

/**
 * Директор для формирования стандартных таблиц
 * @param R Объект строки
 */
export interface ITableDirector<R> {
  /**
   * Метод формирует простую тадлицу из переданных строк
   * Строки формируются из ключей объекта строки
   * @param tableBuilder объект билдера таблиц
   * @param rows массив строк
   */
  buildSimpleTable: (tableBuilder: ITableBuilder<R, R>, rows: R[]) => void;
  /**
   * Метод формирует простую тадлицу из переданных строк и строки футера
   * Строки формируются из ключей объекта строки
   * @param tableBuilder объект билдера таблиц
   * @param rows массив строк
   * @param footerRow строка футера
   */
  buildSimpleTableWithFooter: (
    tableBuilder: ITableBuilder<R, R>,
    rows: R[],
    footerRow: Record<keyof R, string> | null
  ) => void;
}
