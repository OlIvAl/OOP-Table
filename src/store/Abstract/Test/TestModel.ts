import AbstractModel from '../AbstractModel';
import { IStore } from '../interfaces';
import { ITestModel } from './interfaces';

export default class TestModel extends AbstractModel<IStore<ITestModel>> implements ITestModel {}
