import { FinanceActionsStore } from '../FinanceActionsStore';
import { getActionsStoreFromDataLayerMocks } from '../__fixtures__/store_data';
import { RootStore } from '../../RootStore';
import { IStoreWithCurrentModel } from '../../Abstract/interfaces';
import { IFinanceActionModel } from '../interfaces';

const rootStore = new RootStore();
let emptyStore: IStoreWithCurrentModel<IFinanceActionModel>;
let notEmptyStore: IStoreWithCurrentModel<IFinanceActionModel>;

beforeEach(async () => {
  emptyStore = new FinanceActionsStore(rootStore);
  notEmptyStore = await getActionsStoreFromDataLayerMocks();
});

describe('FinanceActionsStore', () => {
  describe('constructor', () => {
    it('init valid store', () => {
      expect(emptyStore).toMatchSnapshot('empty store');
      expect(notEmptyStore).toMatchSnapshot('full store');
    });
  });
});
