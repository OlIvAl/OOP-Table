import { IStoreWithCurrentModel } from '../../../../../store/Abstract/interfaces';
import { IFinanceActionModel } from '../../../../../store/Actions/interfaces';
import { IStoreInitDecorator } from '../../../../../@types/decorators/interfaces';
import { IFinanceActionData } from '../../../../../DataLayer/modules/actions/interfaces';
import { RootStore } from '../../../../../store/RootStore';
import { FinanceActionsStore } from '../../../../../store/Actions/FinanceActionsStore';
import { FinanceActionsStoreInitDecorator } from '../FinanceActionsStoreInitDecorator';
import DataLayer from '../../../../../DataLayer';

const rootStore = new RootStore();
let store: IStoreWithCurrentModel<IFinanceActionModel>;
let decorator: IStoreInitDecorator<IFinanceActionData>;

beforeEach(() => {
  store = new FinanceActionsStore(rootStore);
  decorator = new FinanceActionsStoreInitDecorator(store);
});

describe('FinanceActionsStoreInitDecorator', () => {
  describe('constructor', () => {
    it('init valid object', () => {
      expect(decorator).toMatchSnapshot();
    });
  });
  describe('init', () => {
    it('by models from transfer data', async () => {
      const data = await DataLayer.getBalanceStateData({});
      const modelsData: IFinanceActionData[] = data.actions;
      decorator.init(modelsData);

      expect(store).toMatchSnapshot();
      expect(store.models.length).toEqual(69);
    });
  });
});
