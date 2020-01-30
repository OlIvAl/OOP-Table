
// import * as faker from 'faker';

import { RootStore } from '../../RootStore';
import { IStoreWithCurrentModel } from '../../Abstract/interfaces';
import { IFinanceActionModel } from '../interfaces';
import { FinanceActionsStore } from '../FinanceActionsStore';
import DataLayer from '../../../DataLayer';
import { FinanceActionModel } from '../FinanceActionModel';
import { IFinanceActionData } from '../../../DataLayer/modules/actions/interfaces';

const rootStore = new RootStore();

export const getActionsStoreFromDataLayerMocks = async (): Promise<IStoreWithCurrentModel<IFinanceActionModel>> => {
  const store = new FinanceActionsStore(rootStore);
  const response = await DataLayer.getBalanceStateData({});

  store.models = response.actions.map<IFinanceActionModel>((data: IFinanceActionData) => {
    const model = new FinanceActionModel(store, data.action_id);

    model.action_id = data.action_id;
    model.campaign_id = data.campaign_id;
    model.campaign_name = data.campaign_name;
    model.marker = data.marker;
    model.source = data.source;
    model.action_state = data.action_state;
    model.created_at = data.created_at;
    model.updated_at = data.updated_at;
    model.price = data.price;
    model.description = data.description;
    model.profit_diff = data.profit_diff;
    model.total_profit = data.total_profit;

    return model;
  });

  return store;
};

/*export const getStoreFromFaker = (): IFinanceActionsStore => {
  const store = new FinanceActionsStore(rootStore);

  const models: IFinanceActionModel[] = [];

  for (let i = 0; i < 50; i++) {
    const id = (faker.random.uuid() as unknown) as number;
    models[i] = new FinanceActionModel(store, id);

    models[i].action_id = id;
    models[i].campaign_id = faker.random.number(1000);
    models[i].campaign_name = faker.company.companyName();
    models[i].marker = faker.random.uuid();
    models[i].source = faker.random.word();
    models[i].action_state = faker.helpers.randomize(['paid', 'cancelled', 'processing']);
    models[i].created_at = faker.date.past().toDateString();
    models[i].updated_at = faker.date.past().toDateString();
    models[i].price = faker.helpers.randomize([faker.random.number(1000000), null]);
    models[i].description = faker.lorem.sentences(3);
    models[i].profit_diff = faker.random.number(100);
    models[i].total_profit = faker.random.number(1000);
  }

  store.models = models;

  return store;
};*/
