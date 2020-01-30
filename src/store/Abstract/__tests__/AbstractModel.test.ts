import TestStore from '../Test/TestStore';
import { IStore } from '../interfaces';
import { ITestModel } from '../Test/interfaces';
import TestModel from '../Test/TestModel';
import { RootStore } from '../../RootStore';

let rootStore = new RootStore();
let store: IStore<ITestModel>;
let model: ITestModel;

beforeEach(() => {
  store = new TestStore(rootStore);
  model = new TestModel(store);
});

describe('AbstractModel', () => {
  describe('constructor', () => {
    it('init model with valid store', () => {
      expect(model).toMatchSnapshot();
      expect(model.store).toEqual(store);
    });
  });
});
