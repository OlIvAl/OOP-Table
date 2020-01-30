import { IStoreWithCurrentModel } from '../interfaces';
import { ITestModel } from '../Test/interfaces';
import TestStoreWithCurrentModel from '../Test/TestStoreWithCurrentModel';
import TestModel from '../Test/TestModel';
import { RootStore } from '../../RootStore';

const rootStore = new RootStore();
let store: IStoreWithCurrentModel<ITestModel>;
let models: ITestModel[];

beforeEach(() => {
  store = new TestStoreWithCurrentModel(rootStore);
  models = [new TestModel(store), new TestModel(store), new TestModel(store)];
  store.models = models;
});

describe('AbstractStore', () => {
  describe('constructor', () => {
    it('init valid store', () => {
      expect(store).toMatchSnapshot();
    });
    it('currentModel is null after init', () => {
      expect(store.currentModel).toBeNull();
    });
  });
  describe('setCurrentModel', () => {
    it('set existing model', () => {
      store.setCurrentModel(models[1]);

      expect(store.currentModel).toEqual(models[1]);
    });
    it('throw error when try to set not existing model', () => {
      expect(() => store.setCurrentModel(new TestModel(store))).toThrowError();
    });
  });
  describe('resetStore', () => {
    beforeEach(() => {
      store.currentModel = models[1];
    });

    it('clean models', () => {
      expect(store.models.length).toEqual(3);
      store.resetStore();
      expect(store.models.length).toEqual(0);
    });
    it('set currentModel in null', () => {
      expect(store.currentModel).toEqual(models[1]);
      store.resetStore();
      expect(store.currentModel).toEqual(null);
    });
  });
  describe('resetCurrentModel', () => {
    beforeEach(() => {
      store.currentModel = models[1];
    });

    it('not clean models', () => {
      expect(store.models.length).toEqual(3);
      store.resetCurrentModel();
      expect(store.models.length).toEqual(3);
    });
    it('set currentModel in null', () => {
      expect(store.currentModel).toEqual(models[1]);
      store.resetCurrentModel();
      expect(store.currentModel).toEqual(null);
    });
  });
});
