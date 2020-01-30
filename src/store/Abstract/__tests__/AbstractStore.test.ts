import { IStore } from '../interfaces';
import { ITestModel } from '../Test/interfaces';
import TestStore from '../Test/TestStore';
import TestModel from '../Test/TestModel';
import { RootStore } from '../../RootStore';

let store: IStore<ITestModel>;
let models: ITestModel[];

const rootStore = new RootStore();

beforeEach(() => {
  store = new TestStore(rootStore);
  models = [new TestModel(store), new TestModel(store), new TestModel(store)];
  store.models = models;
});

describe('AbstractStore', () => {
  describe('constructor', () => {
    it('init valid store', () => {
      expect(store).toMatchSnapshot();
    });
  });
  describe('resetStore', () => {
    it('clean models', () => {
      expect(store.models.length).toEqual(3);
      store.resetStore();
      expect(store.models.length).toEqual(0);
    });
  });
});
