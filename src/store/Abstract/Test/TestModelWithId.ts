import AbstractModelWithId from '../AbstractModelWithId';
import { IStore } from '../interfaces';
import { ITestModelWithId } from './interfaces';

export default class TestModelWithId extends AbstractModelWithId<IStore<ITestModelWithId>>
  implements ITestModelWithId {}
