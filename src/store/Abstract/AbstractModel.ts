import { IModel, IStore } from './interfaces';

export default abstract class AbstractModel<T extends IStore<any>> implements IModel<T> {
  readonly store: T;

  constructor(store: T) {
    this.store = store;
  }
}
