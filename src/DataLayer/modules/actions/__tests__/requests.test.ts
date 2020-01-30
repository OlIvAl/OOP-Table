import {
  getFinanceActionsResponce
} from '../__fixtures__/actions_data';
import FetchHelpers from '../../../../lib/FetchHelpers';
import { ActionsRequests } from '../requests';
import { ActionsRequests as ActionsRequestsMock } from '../__mocks__/requests';
import { IBalanceParams } from '../interfaces';

describe('ActionsDataLayer', () => {
  describe('getBalanceStateData', () => {
    let params: IBalanceParams;
    let spyOnGetJSON: any;
    beforeEach(() => {
      params = expect.any(Object) as IBalanceParams;
      spyOnGetJSON = jest
        .spyOn(FetchHelpers, 'getJSON')
        .mockImplementation(getFinanceActionsResponce);
    });
    it('call getJSON', () => {
      ActionsRequests.getBalanceStateData(params);

      expect(spyOnGetJSON).toHaveBeenCalledWith(expect.any(String), params);
    });
    it('return awaited object', async () => {
      const result = await ActionsRequests.getBalanceStateData(params);
      const expectResult = await ActionsRequestsMock.getBalanceStateData(params);

      expect(result).toEqual(expectResult);
    });
  });
});
