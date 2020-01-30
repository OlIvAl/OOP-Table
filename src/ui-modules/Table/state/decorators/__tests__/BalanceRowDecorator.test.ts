import { BalanceRowDecorator } from '../BalanceRowDecorator';
import { IFinanceActionModel } from '../../../../../store/Actions/interfaces';
import { IBalanceRow } from '../../interfaces';
import { IStoreWithCurrentModel } from '../../../../../store/Abstract/interfaces';
import { getActionsStoreFromDataLayerMocks } from '../../../../../store/Actions/__fixtures__/store_data';

let store: IStoreWithCurrentModel<IFinanceActionModel>;
let model: IFinanceActionModel;
let row: IBalanceRow;

beforeEach(async () => {
  store = await getActionsStoreFromDataLayerMocks();
  model = store.models[0];

  row = new BalanceRowDecorator(model);
});

describe('BalanceRowDecorator', () => {
  describe('constructor', () => {
    it('init valid object', () => {
      expect(row).toMatchSnapshot();
    });
  });
  it('get right source', () => {
    expect(row.source).toEqual('Hotellook');
  });
  it('get right created_at', () => {
    expect(row.created_at).toEqual('11.01.2020, 05:20');
  });
  it('get right updated_at', () => {
    expect(row.updated_at).toEqual('11.01.2020, 07:57');
  });
  it('get right description', () => {
    expect(row.description).toEqual(
      'Bangkok(Thailand); Picnic Hotel Bangkok - Rang Nam; 2020-01-17 - 2020-01-18; Booking.com'
    );
  });
  it('get right action_state', () => {
    expect(row.action_state).toEqual('processing');
  });
  it('get right affiliate_commission', () => {
    expect(row.profit_diff).toEqual('18.84 ₽');
  });
  it('get right total_profit', () => {
    expect(row.total_profit).toEqual('1 450 ₽');
  });
  describe('price', () => {
    it('value > 0 => get right price', () => {
      expect(row.price).toEqual('1 000 ₽');
    });
    it('value === 0 => get right price', () => {
      model = store.models[0];
      model.price = 0;

      row = new BalanceRowDecorator(model);

      expect(row.price).toEqual('0 ₽');
    });
    it('value === null => get "-"', () => {
      model = store.models[0];
      model.price = null;
      row = new BalanceRowDecorator(model);

      expect(row.price).toEqual('—');
    });
  });
});
