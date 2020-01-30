import { statusType } from '../../../@types/actions';

/**
 * Объект информации для списка програм, которые участвуют в фильтрации
 */
export interface ICampaignForFiltersData {
  campaign_id: number;
  campaign_name: string;
}
/**
 * Объект букинга
 */
export interface IFinanceActionData {
  action_id: number;
  campaign_id: number;
  campaign_name: string;
  marker: string;
  source: string;
  action_state: statusType;
  created_at: string;
  updated_at: string;
  price: number | null;
  description: string;
  profit_diff: number;
  total_profit: number;
}

/**
 * Объект "итого" для некоторых значений списка букингов
 */
export interface IFinanceActionTotal
  extends Pick<IFinanceActionData, 'price' | 'profit_diff' | 'total_profit'> {}

/**
 * Объект ответа сервера на запрос списка букингов
 */
export interface IFinanceActionsResponse {
  actions: IFinanceActionData[];
  total_row: IFinanceActionTotal;
  total: number;
}

/**
 * Данные для использования в объекте состояния компонента Balance
 */
export interface IBalanceStateData extends IFinanceActionsResponse {}

/**
 * Объект данных для фильтрации списка букингов
 */
export interface IBalanceFilterObject {
  period: { from: string; until: string };
  marker: string;
  status: string;
  campaign_id: number;
}

/**
 * Объект с данными для запроса букингов
 * Состоит из данных пагинации и фильтра
 */
export interface IBalanceParams extends Partial<IBalanceFilterObject> {}
