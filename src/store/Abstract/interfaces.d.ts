import { IRootStore } from '../../interfaces';

/**
 * Объект хранилища
 * @param T интерфейс хранимых моделей
 */
export interface IStore<T extends IModel> {
  /**
   * Ссылка на корневое хранилище
   */
  readonly rootStore: IRootStore;
  /**
   * Список хранимых моделей
   */
  models: T[];

  /**
   * Метод очищает список хранимых моделей
   */
  resetStore: () => void;
}

/**
 * Объект хранилища с активной моделью
 *  @param T интерфейс хранимых моделей
 */
export interface IStoreWithCurrentModel<T extends IModel> extends IStore<T> {
  /**
   * Объект активной модели
   */
  currentModel: T | null;

  /**
   *
   * @param model
   */
  setCurrentModel: (model: T) => void;
  /**
   * Метод убирает активную модель
   */
  resetCurrentModel: () => void;
  /**
   * Метод очищает список хранимых моделей и убирает активную модель
   */
  resetStore: () => void;
}

/**
 * Объект модели
 */
export interface IModel<T extends IStore> {
  readonly store: T;
}

/**
 * Объект модели с id
 */
export interface IModelWithId<T extends IStore> extends IModel<T> {
  readonly id: number;
}

export interface IAbstractInitDecorator<T extends IStore<IModel>> {
  loading: boolean;

  init: () => AsyncGenerator<void>;
}
