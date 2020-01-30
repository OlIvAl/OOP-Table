import { BalanceTotalRowDecorator } from '../BalanceTotalRowDecorator';
import { FinanceActionsDataService } from '../../../services/FinanceActionsDataService';
import { flow } from 'mobx';
import { IBalanceTotalRow, IFinanceActionsDataService } from '../../interfaces';

const currency = 'rub';
let financeActionsDataService: IFinanceActionsDataService;
let totalRow: IBalanceTotalRow;

beforeEach(async () => {
  financeActionsDataService = new FinanceActionsDataService();
  await flow(financeActionsDataService.init)({});

  totalRow = new BalanceTotalRowDecorator(financeActionsDataService.total, currency);
});

describe('BalanceTotalRowDecorator', () => {
  describe('constructor', () => {
    it('init valid object', () => {
      expect(totalRow).toMatchSnapshot();
    });
    it('throw error, if model is null', () => {
      expect(() => new BalanceTotalRowDecorator(null, currency)).toThrowError(/.+/);
    });
  });
  describe('totalRow', () => {
    it('get right totalRow', () => {
      const expectedBalanceTotalRow: IBalanceTotalRow = {
        total_profit: '0 ₽',
        profit_diff: '1 000 ₽',
        created_at: '',
        description: '',
        price: '100 ₽',
        source: '',
        action_state: '',
        updated_at: ''
      };
      expect(totalRow.total_profit).toEqual(expectedBalanceTotalRow.total_profit);
      expect(totalRow.profit_diff).toEqual(expectedBalanceTotalRow.profit_diff);
      expect(totalRow.created_at).toEqual(expectedBalanceTotalRow.created_at);
      expect(totalRow.description).toEqual(expectedBalanceTotalRow.description);
      expect(totalRow.price).toEqual(expectedBalanceTotalRow.price);
      expect(totalRow.source).toEqual(expectedBalanceTotalRow.source);
      expect(totalRow.action_state).toEqual(expectedBalanceTotalRow.action_state);
      expect(totalRow.updated_at).toEqual(expectedBalanceTotalRow.updated_at);
    });
  });
  describe('totalRow with null price', () => {
    it('get right totalRow with "-" on the price place', () => {
      financeActionsDataService.total.price = null;
      totalRow = new BalanceTotalRowDecorator(financeActionsDataService.total, currency);

      const expectedBalanceTotalRow: IBalanceTotalRow = {
        total_profit: '0 ₽',
        profit_diff: '1 000 ₽',
        created_at: '',
        description: '',
        price: '—',
        source: '',
        action_state: '',
        updated_at: ''
      };

      expect(totalRow.total_profit).toEqual(expectedBalanceTotalRow.total_profit);
      expect(totalRow.profit_diff).toEqual(expectedBalanceTotalRow.profit_diff);
      expect(totalRow.created_at).toEqual(expectedBalanceTotalRow.created_at);
      expect(totalRow.description).toEqual(expectedBalanceTotalRow.description);
      expect(totalRow.price).toEqual(expectedBalanceTotalRow.price);
      expect(totalRow.source).toEqual(expectedBalanceTotalRow.source);
      expect(totalRow.action_state).toEqual(expectedBalanceTotalRow.action_state);
      expect(totalRow.updated_at).toEqual(expectedBalanceTotalRow.updated_at);
    });
  });
});
