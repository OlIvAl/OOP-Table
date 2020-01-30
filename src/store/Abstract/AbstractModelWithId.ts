import { IModelWithId, IStore } from './interfaces';
import AbstractModel from './AbstractModel';

export default abstract class AbstractModelWithId<T extends IStore<any>> extends AbstractModel<T>
  implements IModelWithId<T> {
  readonly id: number;

  constructor(store: T, id: number) {
    super(store);

    this.id = id;
  }
}
