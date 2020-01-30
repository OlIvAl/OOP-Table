import { IFinanceActionsDataService } from '../../state/interfaces';
import { FinanceActionsDataService } from '../FinanceActionsDataService';
import DataLayer from '../../../../DataLayer';


let getFinanceActionsService: IFinanceActionsDataService;
let initGenerator: AsyncGenerator<void>;

beforeEach(
  async (): Promise<void> => {
    getFinanceActionsService = new FinanceActionsDataService();
    initGenerator = getFinanceActionsService.init({});
  }
);

describe('FinanceActionsDataService', () => {
  describe('constructor', () => {
    it('init valid object', () => {
      expect(getFinanceActionsService).toMatchSnapshot();
    });
  });
  describe('init', () => {
    it('set loading', async () => {
      await initGenerator.next();

      expect(getFinanceActionsService.loading).toEqual(true);
    });
    describe('getData', () => {
      it('call getBalanceStateData once', async () => {
        const getBalanceStateDataSpy = jest.spyOn(DataLayer, 'getBalanceStateData');

        await initGenerator.next();
        await initGenerator.next();

        expect(getBalanceStateDataSpy).toHaveBeenCalled();
        expect(getBalanceStateDataSpy).toHaveBeenCalledTimes(1);
      });
      it('throw error, if server send error', async () => {
        const error = Error('');
        jest.spyOn(DataLayer, 'getBalanceStateData').mockImplementation(async () => {
          throw error;
        });

        await initGenerator.next();

        await expect(initGenerator.next()).rejects.toThrow(error);
      });
    });
    it('set total', async () => {
      await initGenerator.next();
      await initGenerator.next();

      expect(getFinanceActionsService.total).toEqual({
        price: 100,
        profit_diff: 1000,
        total_profit: 0
      });
    });
    it('set totalAmount to store', async () => {
      await initGenerator.next();
      await initGenerator.next();

      expect(getFinanceActionsService.totalAmount).toEqual(69);
    });
    it('unset loading', async () => {
      await initGenerator.next();
      await initGenerator.next();
      await initGenerator.next();

      expect(getFinanceActionsService.loading).toEqual(false);
    });
  });
});
