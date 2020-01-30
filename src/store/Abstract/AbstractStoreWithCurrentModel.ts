import { action, observable } from 'mobx';
import { IModel, IStoreWithCurrentModel } from './interfaces';
import AbstractStore from './AbstractStore';

export default abstract class AbstractStoreWithCurrentModel<T extends IModel<any>>
  extends AbstractStore<T>
  implements IStoreWithCurrentModel<T> {
  @observable currentModel: T | null = null;

  @action.bound setCurrentModel(model: T): void {
    const currentModelIndex: number = this.models.indexOf(model);

    if (currentModelIndex < 0) {
      throw Error('The desired model does not exist');
    }

    this.currentModel = this.models[currentModelIndex];
  }

  @action.bound resetStore(): void {
    super.resetStore();
    this.resetCurrentModel();
  }

  @action.bound resetCurrentModel(): void {
    this.currentModel = null;
  }
}
