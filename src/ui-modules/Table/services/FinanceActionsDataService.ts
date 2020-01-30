import { action, observable, runInAction } from 'mobx';
import { IBalanceParams, IFinanceActionsDataService } from '../state/interfaces';
import {
  IBalanceStateData,
  IFinanceActionData,
  IFinanceActionTotal
} from '../../../DataLayer/modules/actions/interfaces';
import DataLayer from '../../../DataLayer';

export class FinanceActionsDataService implements IFinanceActionsDataService {
  @observable loading: boolean = true;
  @observable actions: IFinanceActionData[] = [];
  @observable total: IFinanceActionTotal | null = null;
  @observable totalAmount: number = 0;

  @action.bound async *init(params: IBalanceParams): AsyncGenerator<void> {
    yield this.setLoading();

    yield this.getData(params);

    yield this.unsetLoading();
  }

  /**
   * Делает запрос за данными списка букингов
   * Инициализирует хранилище списка букингов
   * Инициализирует хранилище програм для фильтрации
   * @param params Объект с данными для запроса букингов
   */
  @action.bound protected async getData(params: IBalanceParams): Promise<void> {
    try {
      const data: IBalanceStateData = await DataLayer.getBalanceStateData(params);

      runInAction(() => {
        this.actions = data.actions;
        this.total = data.total_row;
        this.totalAmount = data.total;
        this.actions = data.actions;
        this.total = data.total_row;
        this.totalAmount = data.total;
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   * Ставит флаг загрузки в true
   */
  @action.bound protected setLoading(): void {
    this.loading = true;
  }
  /**
   * Ставит флаг загрузки в false
   */
  @action.bound protected unsetLoading(): void {
    this.loading = false;
  }
}
