import { ITestModel, ITestRow, modelsToRowsConverter } from '../../__fixtures__/tableData';
import { InitRowsHandler } from '../InitRowsHandler';
import { Table } from '../../Table';

let models: ITestModel[];
let rows: ITestRow[];
let initRowsHandler: InitRowsHandler<ITestModel, ITestRow>;
const table = new Table<ITestRow>();

beforeEach(() => {
  models = [
    {
      value1: 68,
      value2: 'Handcrafted',
      value3: {
        subValue1: 75,
        subValue2: 'programming'
      }
    },
    {
      value1: 79,
      value2: 'black',
      value3: {
        subValue1: 6,
        subValue2: 'Configuration'
      }
    },
    {
      value1: 60,
      value2: 'Handmade Metal Fish',
      value3: {
        subValue1: 90,
        subValue2: 'Ville'
      }
    }
  ];
  rows = [
    {
      col1: '68',
      col2: 'Handcrafted',
      col3: '75 programming'
    },
    {
      col1: '79',
      col2: 'black',
      col3: '6 Configuration'
    },
    {
      col1: '60',
      col2: 'Handmade Metal Fish',
      col3: '90 Ville'
    }
  ];
  initRowsHandler = new InitRowsHandler<ITestModel, ITestRow>(models, modelsToRowsConverter);
});

describe('InitRowsHandler', () => {
  describe('constructor', () => {
    it('init rows handler with valid object', () => {
      expect(initRowsHandler).toMatchSnapshot();
    });
  });
  describe('handle', () => {
    it('correctly init rows', () => {
      initRowsHandler.handle(table);

      expect(table.rows).toEqual(rows);
    });
  });
});
