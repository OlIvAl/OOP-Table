import { ITableBuilder } from '../interfaces';
import { TableBuilder } from '../TableBuilder';
import { Table } from '../Table';
import {
  columnKeys,
  columns,
  getFakeModels,
  getFooterRow,
  ITestModel,
  ITestRow,
  modelsToRowsConverter
} from '../__fixtures__/tableData';

let tableBuilder: ITableBuilder<ITestModel, ITestRow>;
let tableBuilderForDecorators: ITableBuilder<ITestRow, ITestRow>;
let models: ITestModel[];

let rows: ITestRow[];
let footerRow: ITestRow;
const table = new Table<ITestRow>();
const tableWithFooter = new Table<ITestRow>();

beforeEach(() => {
  tableBuilder = new TableBuilder<ITestModel, ITestRow>();
  tableBuilderForDecorators = new TableBuilder<ITestRow, ITestRow>();
  models = getFakeModels();

  footerRow = getFooterRow();

  rows = models.map(modelsToRowsConverter);

  table.rows = rows;
  table.columns = columns;

  tableWithFooter.rows = rows;
  tableWithFooter.columns = columns;
  tableWithFooter.footerRow = footerRow;
});

describe('TableBuilder', () => {
  describe('constructor', () => {
    it('init table builder with valid object', () => {
      expect(new TableBuilder<ITestRow, ITestRow>()).toMatchSnapshot();
    });
  });
  describe('setColumnKeys', () => {
    it('call once', () => {
      const spy = jest.spyOn(tableBuilder, 'setColumnKeys');
      tableBuilder.setColumnKeys(columnKeys);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(columnKeys);
    });
    it('call with empty array', () => {
      expect(() => tableBuilder.setColumnKeys([])).toThrowError(/.+/);
    });
  });
  describe('setModels', () => {
    it('call once', () => {
      const spy = jest.spyOn(tableBuilder, 'setModels');
      tableBuilder.setModels(models);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(models);
    });
  });
  describe('setModelsToRowsConverter', () => {
    it('call once', () => {
      const spy = jest.spyOn(tableBuilder, 'setModelsToRowsConverter');
      tableBuilder.setModelsToRowsConverter(modelsToRowsConverter);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(modelsToRowsConverter);
    });
  });
  describe('setFooter', () => {
    it('call once', () => {
      const spy = jest.spyOn(tableBuilder, 'setFooter');
      tableBuilder.setFooter(footerRow);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(footerRow);
    });
  });
  describe('getTable', () => {
    it('if you correct init builder, it return valid table object', () => {
      tableBuilder.setColumnKeys(columnKeys);
      tableBuilder.setModels(models);
      tableBuilder.setModelsToRowsConverter(modelsToRowsConverter);

      const currentTable = tableBuilder.getTable();

      expect(currentTable).toEqual(table);
    });
    it('you can not pass converter and pass ready rows, it return valid table object', () => {
      tableBuilderForDecorators.setColumnKeys(columnKeys);
      tableBuilderForDecorators.setModels(rows);

      const currentTable = tableBuilderForDecorators.getTable();

      expect(currentTable).toEqual(table);
    });
    it('set column keys is required for call getTable', () => {
      tableBuilder.setModels(models);
      tableBuilder.setModelsToRowsConverter(modelsToRowsConverter);

      expect(tableBuilder.getTable).toThrowError(/.+/);
    });
  });
  describe('getTable with footer', () => {
    it('if you correct init builder, it return valid table object', () => {
      tableBuilder.setColumnKeys(columnKeys);
      tableBuilder.setModels(models);
      tableBuilder.setModelsToRowsConverter(modelsToRowsConverter);
      tableBuilder.setFooter(footerRow);

      const currentTable = tableBuilder.getTable();

      expect(currentTable).toEqual(tableWithFooter);
    });
    it('you can not pass converter and pass ready rows, it return valid table object', () => {
      tableBuilderForDecorators.setColumnKeys(columnKeys);
      tableBuilderForDecorators.setModels(rows);
      tableBuilderForDecorators.setFooter(footerRow);

      const currentTable = tableBuilderForDecorators.getTable();

      expect(currentTable).toEqual(tableWithFooter);
    });
  });
  describe('reset', () => {
    it('reset table columnKeys models modelsToRowsConverter footerRow', () => {
      tableBuilder.setColumnKeys(columnKeys);
      tableBuilder.setModels(models);
      tableBuilder.setModelsToRowsConverter(modelsToRowsConverter);
      tableBuilder.setFooter(footerRow);

      const currentTable = tableBuilder.getTable();

      expect(currentTable).toEqual(tableWithFooter);

      tableBuilder.reset();

      //@ts-ignore
      expect(tableBuilder.table.columns).toEqual(null);
      //@ts-ignore
      expect(tableBuilder.columnKeys).toEqual([]);
      //@ts-ignore
      expect(tableBuilder.models).toEqual([]);
      //@ts-ignore
      expect(tableBuilder.modelsToRowsConverter).toEqual(null);
      //@ts-ignore
      expect(tableBuilder.footerRow).toEqual(null);
    });
  });
});
