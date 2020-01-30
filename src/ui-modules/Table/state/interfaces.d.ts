/**
 * Декоратор с функционалом инициализации стора букингов
 */
import { IPaginationObject } from '../../../../../lib/Pagination/interfaces';
import { IFinanceActionData, IFinanceActionTotal } from '../../../../../DataLayer/responses';
import { IFinanceActionDetailStateData } from '../../../../../DataLayer/modules/actions/interfaces';
import { actionType, statusType } from '../../../../../@types/actions';

/**
 * Декоратор с функционалом получения списка по букингов
 */
export interface IFinanceActionsDataService {
  /**
   * Флаг загрузки
   */
  loading: boolean;

  actions: IFinanceActionData[];

  total: IFinanceActionTotal | null;
  totalAmount: number;

  init: (params: IBalanceParams) => AsyncGenerator<void>;
}

/**
 * Декоратор с функционалом получения детализации по букингу
 */
export interface IFinanceActionDetailDataService {
  /**
   * Флаг загрузки
   */
  loading: boolean;
  action: IFinanceActionDetailStateData['action'] | null;
  transactions: IFinanceActionDetailStateData['transactions'];
  transactionsTotal: IFinanceActionDetailStateData['transactionsTotal'] | null;
  additionalFields: IFinanceActionDetailStateData['additionalFields'];
  init: (action_id: number, marker: number, currency: string) => AsyncGenerator<void>;
}

/**
 * Объект с полями для вывода списка мета информации букинга
 */
export interface IDataListItem {
  key: string;
  description: string;
}

/**
 * Объект с детальной информацией по букингу
 */
export interface IBookingDetail {
  price: string;
  total_profit: string;
  action_state: statusType;
  marker: string;
  action_state: string;
  created_at: string;
  campaign_id: number;
  campaign_name: string;
  action_id: number;
  metaList: IDataListItem[];
  action_type: actionType | '';
  host: string;
}

/**
 * Объект строки таблицы букингов
 */
export interface IBalanceRow {
  source: string;
  created_at: string;
  updated_at: string;
  description: string;
  action_state: statusType;
  price: string;
  profit_diff: string;
  total_profit: string;
}

/**
 * Объукт строки "итого" в таблице букингов
 */
export interface IBalanceTotalRow {
  source: '';
  created_at: '';
  updated_at: '';
  description: '';
  action_state: '';
  price: string;
  profit_diff: string;
  total_profit: string;
}

/**
 * Объект строки в таблице транзакций
 */
export interface ITransactionRow {
  created_at: string;
  status: statusType;
  price: string;
  profit_diff: string;
  total_profit: string;
}
/**
 * Объукт строки "итого" в таблице транзакций
 */
export interface ITransactionTotalRow {
  created_at: '';
  status: '';
  price: '';
  profit_diff: '';
  total_profit: string;
}

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
export interface IBalanceParams extends Partial<IBalanceFilterObject>, IPaginationObject {}
