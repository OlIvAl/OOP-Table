import { IModel, IStore, IModelWithId } from '../interfaces';

export interface ITestModel extends IModel<IStore<ITestModel>> {}
export interface ITestModelWithId extends IModelWithId<IStore<ITestModelWithId>> {}
