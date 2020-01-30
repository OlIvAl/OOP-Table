import { InitFooterRowHandler } from '../InitFooterRowHandler';
import { ITestModel, ITestRow } from '../../__fixtures__/tableData';
import { Table } from '../../Table';

let footerRow: ITestRow;
let initFooterRowHandlerWithFooter: InitFooterRowHandler<ITestModel, ITestRow>;
let initFooterRowHandlerWithoutFooter: InitFooterRowHandler<ITestModel, ITestRow>;
let tableWithFooter: Table<ITestRow> = new Table<ITestRow>();
let tableWithoutFooter: Table<ITestRow> = new Table<ITestRow>();

beforeEach(() => {
  tableWithFooter = new Table<ITestRow>();
  tableWithoutFooter = new Table<ITestRow>();

  footerRow = {
    col1: '29',
    col2: '69',
    col3: ''
  };
  initFooterRowHandlerWithFooter = new InitFooterRowHandler<ITestModel, ITestRow>(footerRow);
  initFooterRowHandlerWithoutFooter = new InitFooterRowHandler<ITestModel, ITestRow>(null);
});

describe('InitFooterRowHandler', () => {
  describe('constructor', () => {
    it('init footer row handler with valid object', () => {
      expect(initFooterRowHandlerWithFooter).toMatchSnapshot();
    });
  });
  describe('handle', () => {
    it('correctly init footer row', () => {
      initFooterRowHandlerWithFooter.handle(tableWithFooter);

      expect(tableWithFooter.footerRow).toEqual(footerRow);
    });
    it('not init footer row, if row object is null', () => {
      initFooterRowHandlerWithoutFooter.handle(tableWithoutFooter);

      expect(tableWithFooter.footerRow).toEqual(null);
    });
  });
});
