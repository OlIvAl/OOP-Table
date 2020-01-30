import { action, observable } from 'mobx';
import { IModel, IStore } from './interfaces';
import { RootStore } from '../RootStore';

export default abstract class AbstractStore<T extends IModel<any>> implements IStore<T> {
  readonly rootStore: RootStore;

  @observable models: T[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action.bound resetStore(): void {
    this.models = [];
  }
}
