/**
 * Декоратор, который содержит метод для инициализации стора
 * @param T объект с данными для создания модели
 */
export interface IStoreInitDecorator<T> {
  /**
   * Метод для инициализации стора
   * @param modelsData - массив с данными для создания моделей
   */
  init: (modelsData: T[]) => void;
}
