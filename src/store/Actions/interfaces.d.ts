import { IModelWithId } from '../Abstract/interfaces';
import { IFinanceActionData } from '../../../DataLayer/modules/actions/interfaces';
import { actionType } from '../../../@types/actions';

export interface IFinanceActionDetailData
  extends Pick<
      IFinanceActionData,
      | 'action_id'
      | 'campaign_id'
      | 'campaign_name'
      | 'action_state'
      | 'marker'
      | 'price'
      | 'created_at'
      | 'total_profit'
      | 'source'
    >,
    Partial<Pick<IFinanceActionData, 'updated_at' | 'description' | 'profit_diff'>> {
  action_type?: actionType;
}

export interface IFinanceActionModel
  extends IModelWithId<IFinanceActionsStore>,
    IFinanceActionData,
    Exclude<IFinanceActionDetailData, 'meta'> {
  init: (data: IFinanceActionDetailData) => void;
}

// export interface IFinanceActionsStore extends IStoreWithCurrentModel<IFinanceActionModel> {}
