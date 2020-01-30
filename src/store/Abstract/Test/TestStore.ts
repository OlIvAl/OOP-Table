import AbstractStore from '../AbstractStore';
import { ITestModel } from './interfaces';
import { IStore } from '../interfaces';

export default class TestStore extends AbstractStore<ITestModel> implements IStore<ITestModel> {}
