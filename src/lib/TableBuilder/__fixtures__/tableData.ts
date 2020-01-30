import { IColumn, IModelsToRowsConverter } from '../interfaces';
// import * as faker from 'faker';

export interface ITestModel {
  value1: number;
  value2: string;
  value3: {
    subValue1: number;
    subValue2: string;
  };
}
export interface ITestRow {
  col1: string;
  col2: string;
  col3: string;
}

export const modelsToRowsConverter: IModelsToRowsConverter<ITestModel, ITestRow> = model => {
  return {
    col1: model.value1.toString(),
    col2: model.value2,
    col3: `${model.value3.subValue1} ${model.value3.subValue2}`
  };
};

export const columnKeys: (keyof ITestRow)[] = ['col1', 'col2', 'col3'];

export const columns: Record<keyof ITestRow, IColumn<ITestRow>> = {
  col1: {
    accessor: columnKeys[0],
    headerClassName: columnKeys[0]
  },
  col2: {
    accessor: columnKeys[1],
    headerClassName: columnKeys[1]
  },
  col3: {
    accessor: columnKeys[2],
    headerClassName: columnKeys[2]
  }
};

export const getFakeModels = () => [
  { value1: 7, value2: 'ADP', value3: { subValue1: 76, subValue2: 'compelling' } },
  { value1: 47, value2: 'evolve', value3: { subValue1: 47, subValue2: 'array' } },
  { value1: 93, value2: 'Sleek', value3: { subValue1: 100, subValue2: 'grow' } }
];

export const getFooterRow = () => ({ col1: '65', col2: '57', col3: '' });
