import { ITestModel } from './interfaces';
import { IStoreWithCurrentModel } from '../interfaces';
import AbstractStoreWithCurrentModel from '../AbstractStoreWithCurrentModel';

export default class TestStoreWithCurrentModel extends AbstractStoreWithCurrentModel<ITestModel>
  implements IStoreWithCurrentModel<ITestModel> {}
