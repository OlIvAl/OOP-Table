import { FinanceActionsStore } from './Actions/FinanceActionsStore';
import { IFinanceActionModel } from './Actions/interfaces';
import { IStoreWithCurrentModel } from './Abstract/interfaces';

export class RootStore {
  financeActionsStore: IStoreWithCurrentModel<IFinanceActionModel>;

  constructor() {
    this.financeActionsStore = new FinanceActionsStore(this);
  }
}