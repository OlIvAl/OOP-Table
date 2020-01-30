import { IBalanceRow } from '../interfaces';
import { IFinanceActionModel } from '../../../../store/Actions/interfaces';
import { FormatHelper } from '../../../../lib/FormatHelper';
import { statusType } from '../../../../@types/actions';


export class BalanceRowDecorator implements IBalanceRow {
  get source(): string {
    return this.wrappee.campaign_name;
  }

  get created_at(): string {
    return FormatHelper.formatCellValue(
      this.wrappee.created_at,
      'datetime',
      this.currency
    ) as string;
  }

  get updated_at(): string {
    return FormatHelper.formatCellValue(
      this.wrappee.updated_at,
      'datetime',
      this.currency
    ) as string;
  }

  get description(): string {
    return this.wrappee.description;
  }

  get action_state(): statusType {
    return this.wrappee.action_state;
  }

  get price(): string {
    if (this.wrappee.price === null) {
      return '—';
    }
    return FormatHelper.formatCellValue(this.wrappee.price, 'money', this.currency) as string;
  }

  get profit_diff(): string {
    return FormatHelper.formatCellValue(this.wrappee.profit_diff, 'money', this.currency) as string;
  }

  get total_profit(): string {
    return FormatHelper.formatCellValue(this.wrappee.total_profit, 'money', this.currency) as string;
  }

  protected wrappee: IFinanceActionModel;
  protected get currency(): string {
    return 'rub';
  }

  constructor(wrappee: IFinanceActionModel) {
    this.wrappee = wrappee;
  }
}
