import AbstractStore from '../AbstractStore';
import { ITestModelWithId } from './interfaces';
import { IStore } from '../interfaces';

export default class TestStoreWithModelsWithId extends AbstractStore<ITestModelWithId>
  implements IStore<ITestModelWithId> {}
