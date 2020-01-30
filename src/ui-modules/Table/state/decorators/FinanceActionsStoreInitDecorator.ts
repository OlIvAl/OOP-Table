import { IFinanceActionData } from '../../../../DataLayer/modules/actions/interfaces';
import { IFinanceActionModel } from '../../../../store/Actions/interfaces';
import { action, runInAction } from 'mobx';
import { FinanceActionModel } from '../../../../store/Actions/FinanceActionModel';
import { IStoreWithCurrentModel } from '../../../../store/Abstract/interfaces';
import { IStoreInitDecorator } from '../../../../@types/decorators/interfaces';

export class FinanceActionsStoreInitDecorator implements IStoreInitDecorator<IFinanceActionData> {
  protected wrappee: IStoreWithCurrentModel<IFinanceActionModel>;

  constructor(wrappee: IStoreWithCurrentModel<IFinanceActionModel>) {
    this.wrappee = wrappee;
  }

  @action.bound init(modelsData: IFinanceActionData[]): void {
    const models = modelsData.map<IFinanceActionModel>((actionData: IFinanceActionData) => {
      const model = new FinanceActionModel(this.wrappee, actionData.action_id);
      model.init(actionData);

      return model;
    });

    runInAction((): void => {
      this.wrappee.models = models;
    });
  }
}
