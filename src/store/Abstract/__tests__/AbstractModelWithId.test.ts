import TestStoreWithModelsWithId from '../Test/TestStoreWithModelsWithId';
import { IStore } from '../interfaces';
import { ITestModelWithId } from '../Test/interfaces';
import TestModelWithId from '../Test/TestModelWithId';
import { RootStore } from '../../RootStore';

function getRandomInt() {
  return Math.floor(Math.random());
}

let rootStore = new RootStore();
let store: IStore<ITestModelWithId>;
let model: ITestModelWithId;
let id: number;

beforeEach(() => {
  id = getRandomInt();
  store = new TestStoreWithModelsWithId(rootStore);
  model = new TestModelWithId(store, id);
});

describe('AbstractModel', () => {
  describe('constructor', () => {
    it('init model with valid store', () => {
      expect(model).toMatchSnapshot();
      expect(model.store).toEqual(store);
    });
    it('init model with valid id', () => {
      expect(model.id).toEqual(id);
    });
  });
});
