import { IBalanceTotalRow } from '../interfaces';
import { IFinanceActionTotal } from '../../../../DataLayer/modules/actions/interfaces';
import { FormatHelper } from '../../../../lib/FormatHelper';

export class BalanceTotalRowDecorator implements IBalanceTotalRow {
  source: '' = '';
  created_at: '' = '';
  updated_at: '' = '';
  description: '' = '';
  action_state: '' = '';

  get price(): string {
    if (!this.wrappee.price) {
      return '—';
    }
    return FormatHelper.formatCellValue(this.wrappee.price, 'money', this.currency) as string;
  }

  get total_profit(): string {
    return FormatHelper.formatCellValue(this.wrappee.total_profit, 'money', this.currency) as string;
  }

  get profit_diff(): string {
    return FormatHelper.formatCellValue(this.wrappee.profit_diff, 'money', this.currency) as string;
  }

  protected wrappee: IFinanceActionTotal;
  protected currency: string;

  constructor(wrappee: IFinanceActionTotal | null, currency: string) {
    if (!wrappee) {
      throw Error('Total field must not be null');
    }

    this.wrappee = wrappee;
    this.currency = currency;
  }
}
