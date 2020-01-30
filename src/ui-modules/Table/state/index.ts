import { action, computed, flow, IReactionDisposer, reaction } from 'mobx';
import { BalanceRowDecorator } from './decorators/BalanceRowDecorator';
import { BalanceTotalRowDecorator } from './decorators/BalanceTotalRowDecorator';
import { ITable } from '../../../lib/TableBuilder/interfaces';
import { IFinanceActionModel } from '../../../store/Actions/interfaces';
import { TableBuilder } from '../../../lib/TableBuilder/TableBuilder';
import { IBalanceParams, IFinanceActionData } from '../../../DataLayer/modules/actions/interfaces';
import { IStoreWithCurrentModel } from '../../../store/Abstract/interfaces';
import { IBalanceRow, IBalanceTotalRow, IFinanceActionsDataService } from './interfaces';
import { FinanceActionsStoreInitDecorator } from './decorators/FinanceActionsStoreInitDecorator';

/**
 * Объект состояния компонента баланса
 */
export class BalanceTableState {
  @computed get loading(): boolean {
    return this.getFinanceActionsService.loading;
  }
  @computed get balanceTableShown(): boolean {
    return !!this.financeActionsStore.models.length;
  }
  @computed get table(): ITable<IBalanceRow> | null {
    const models: IFinanceActionModel[] = this.financeActionsStore.models;
    if (!models.length) {
      return null;
    }

    const rows: IBalanceRow[] = models.map<IBalanceRow>(model => new BalanceRowDecorator(model));

    const balanceTableBuilder = new TableBuilder<IBalanceRow>();
    const totalRow: IBalanceTotalRow | null = this.getFinanceActionsService.total
      ? new BalanceTotalRowDecorator(this.getFinanceActionsService.total, this.currency)
      : null;

    balanceTableBuilder.setColumnKeys([
      'source',
      'created_at',
      'updated_at',
      'description',
      'action_state',
      'price',
      'profit_diff',
      'total_profit'
    ]);
    balanceTableBuilder.setModels(rows);
    balanceTableBuilder.setFooter(totalRow);

    return balanceTableBuilder.getTable();
  }

  protected financeActionsStore: IStoreWithCurrentModel<IFinanceActionModel>;
  protected getFinanceActionsService: IFinanceActionsDataService;
  protected financeActionsDataHandler: IReactionDisposer;

  protected get currency(): string {
    return 'rub';
  }

  constructor(
    financeActionsStore: IStoreWithCurrentModel<IFinanceActionModel>,
    getFinanceActionsService: IFinanceActionsDataService
  ) {
    this.financeActionsStore = financeActionsStore;
    this.getFinanceActionsService = getFinanceActionsService;

    this.financeActionsDataHandler = reaction<IFinanceActionData[]>(
      () => this.getFinanceActionsService.actions,
      (actions): void => {
        new FinanceActionsStoreInitDecorator(this.financeActionsStore).init(actions);
      }
    );
  }

  @action.bound async init(): Promise<void> {
    const params: IBalanceParams = {};

    await flow(this.getFinanceActionsService.init)(params);
  }

  /**
   * Метод получения списка букингов по передаваемым параметрам
   * @param params Объект с данными для запроса букингов
   */
  @action.bound async getFinanceActions(params: IBalanceParams): Promise<void> {
    await flow(this.getFinanceActionsService.init)(params);
  }

  /**
   * Сбрасывает хранилище
   */
  @action.bound dispose(): void {
    this.financeActionsStore.resetStore();
    this.financeActionsDataHandler();
  }
}
