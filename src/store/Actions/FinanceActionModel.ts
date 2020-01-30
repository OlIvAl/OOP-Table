import { IFinanceActionDetailData, IFinanceActionModel } from './interfaces';
import AbstractModelWithId from '../Abstract/AbstractModelWithId';
import { action, observable } from 'mobx';
import { IStore } from '../Abstract/interfaces';
import { actionType, statusType } from '../../@types/actions';

export class FinanceActionModel extends AbstractModelWithId<IStore<IFinanceActionModel>>
  implements IFinanceActionModel {
  @observable action_id: number = 0;
  @observable campaign_id: number = 0;
  @observable marker: string = '';
  @observable source: string = '';
  @observable action_state: statusType = 'processing';
  @observable created_at: string = '';
  @observable updated_at: string = '';
  @observable campaign_name: string = '';
  @observable price: number | null = null;
  @observable description: string = '';
  @observable profit_diff: number = 0;
  @observable total_profit: number = 0;
  @observable action_type?: actionType;

  @action.bound init(data: IFinanceActionDetailData) {
    this.action_id = data.action_id;
    this.campaign_id = data.campaign_id;
    this.marker = data.marker;
    this.source = data.source;
    this.action_state = data.action_state;
    this.created_at = data.created_at;
    this.campaign_name = data.campaign_name;
    this.price = data.price;
    this.total_profit = data.total_profit;
    this.action_type = data.action_type;
    this.updated_at = data.updated_at || '';
    this.description = data.description || '';
    this.profit_diff = data.profit_diff || 0;
  }
}
