import { columnKeys, columns, ITestModel, ITestRow } from '../../__fixtures__/tableData';
import { InitColumnsHandler } from '../InitColumnsHandler';
import { Table } from '../../Table';

let initColumnsHandler: InitColumnsHandler<ITestModel, ITestRow>;
const table = new Table<ITestRow>();

beforeEach(() => {
  initColumnsHandler = new InitColumnsHandler<ITestModel, ITestRow>(columnKeys);
});

describe('InitColumnsHandler', () => {
  describe('constructor', () => {
    it('init columns handler with valid object', () => {
      expect(initColumnsHandler).toMatchSnapshot();
    });
  });
  describe('handle', () => {
    it('correctly init columns', () => {
      initColumnsHandler.handle(table);

      expect(table.columns).toEqual(columns);
    });
  });
});
