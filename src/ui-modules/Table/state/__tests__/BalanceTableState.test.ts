import { RootStore } from '../../../../store/RootStore';
import { IStoreWithCurrentModel } from '../../../../store/Abstract/interfaces';
import { IFinanceActionModel } from '../../../../store/Actions/interfaces';
import { BalanceTableState } from '../index';
import { FinanceActionsStore } from '../../../../store/Actions/FinanceActionsStore';
import { FinanceActionsDataService } from '../../services/FinanceActionsDataService';
import { IFinanceActionsDataService } from '../interfaces';


let rootStore = new RootStore();
let financeActionsStore: IStoreWithCurrentModel<IFinanceActionModel>;
let balanceTableState: BalanceTableState;
let getFinanceActionsService: IFinanceActionsDataService;

beforeEach(async () => {
  financeActionsStore = new FinanceActionsStore(rootStore);
  getFinanceActionsService = new FinanceActionsDataService();
  balanceTableState = new BalanceTableState(financeActionsStore, getFinanceActionsService);
});

afterEach(() => {
  balanceTableState.dispose();
  jest.restoreAllMocks();
});

describe('BalanceTableState', () => {
  describe('table', () => {
    it('return null with empty rows', () => {
      expect(balanceTableState.table).toEqual(null);
    });
    describe('return valid table object', () => {
      beforeEach(async () => {
        await balanceTableState.init();
      });
      it('with valid columns', () => {
        expect(balanceTableState.table?.columns).toEqual({
          source: {
            accessor: 'source',
            headerClassName: 'source'
          },
          created_at: {
            accessor: 'created_at',
            headerClassName: 'created_at'
          },
          updated_at: {
            accessor: 'updated_at',
            headerClassName: 'updated_at'
          },
          description: {
            accessor: 'description',
            headerClassName: 'description'
          },
          action_state: {
            accessor: 'action_state',
            headerClassName: 'action_state'
          },
          price: {
            accessor: 'price',
            headerClassName: 'price'
          },
          profit_diff: {
            accessor: 'profit_diff',
            headerClassName: 'profit_diff'
          },
          total_profit: {
            accessor: 'total_profit',
            headerClassName: 'total_profit'
          }
        });
      });
      it('with valid count rows', () => {
        expect(balanceTableState.table?.rows.length).toEqual(69);
      });
      it('with valid footer row', () => {
        expect(balanceTableState.table?.footerRow?.source).toEqual('');
        expect(balanceTableState.table?.footerRow?.created_at).toEqual('');
        expect(balanceTableState.table?.footerRow?.updated_at).toEqual('');
        expect(balanceTableState.table?.footerRow?.description).toEqual('');
        expect(balanceTableState.table?.footerRow?.action_state).toEqual('');
        expect(balanceTableState.table?.footerRow?.price).toEqual('100 ₽');
        expect(balanceTableState.table?.footerRow?.profit_diff).toEqual('1 000 ₽');
        expect(balanceTableState.table?.footerRow?.total_profit).toEqual('0 ₽');
      });
    });
  });
  describe('loading', () => {
    let initGenerator: AsyncGenerator<void>;
    beforeEach(() => {
      initGenerator = getFinanceActionsService.init({});
    });

    it('init start => loading = true', async () => {
      await initGenerator.next();

      expect(balanceTableState.loading).toEqual(true);
    });
    it('init finish => loading = false', async () => {
      await initGenerator.next();
      await initGenerator.next();
      await initGenerator.next();

      expect(balanceTableState.loading).toEqual(false);
    });
  });
  describe('balanceTableShown', () => {
    it('before init balanceTableShown eq false', () => {
      expect(balanceTableState.balanceTableShown).toBeFalsy();
    });
    it('after init balanceTableShown eq true', async () => {
      await balanceTableState.init();

      expect(balanceTableState.balanceTableShown).toBeTruthy();
    });
  });
  describe('dispose', () => {
    it('reset store', () => {
      balanceTableState.dispose();

      expect(financeActionsStore.currentModel).toEqual(null);
      expect(financeActionsStore.models.length).toEqual(0);
    });
  });
  describe('init', () => {
    it('call service init with default params', async () => {
      const getFinanceActionsInitSpy = jest.spyOn(
        getFinanceActionsService,
        'init'
      );

      await balanceTableState.init();

      expect(getFinanceActionsInitSpy).toHaveBeenCalled();
      expect(getFinanceActionsInitSpy).toHaveBeenCalledTimes(1);
      expect(getFinanceActionsInitSpy).toHaveBeenCalledWith({});
    });
    it('init store', async () => {
      expect(financeActionsStore.models.length).toEqual(0);
      await balanceTableState.init();
      expect(financeActionsStore.models.length).toEqual(69);
    });
  });
  describe('getFinanceActions', () => {
    it('call getFinanceActionsDecorator.init', async () => {
      const params = {};
      const getFinanceActionsInitSpy = jest.spyOn(
        getFinanceActionsService,
        'init'
      );

      await balanceTableState.getFinanceActions(params);

      expect(getFinanceActionsInitSpy).toHaveBeenCalled();
      expect(getFinanceActionsInitSpy).toHaveBeenCalledTimes(1);
      expect(getFinanceActionsInitSpy).toHaveBeenCalledWith(params);
    });
  });
});
