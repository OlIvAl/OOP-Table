import { FinanceActionModel } from '../FinanceActionModel';
import { FinanceActionsStore } from '../FinanceActionsStore';
import { RootStore } from '../../RootStore';

describe('FinanceActionModel', () => {
  describe('constructor', () => {
    it('init valid model', () => {
      expect(new FinanceActionModel(new FinanceActionsStore(new RootStore()), 7)).toMatchSnapshot();
    });
  });
});
