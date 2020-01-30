import {
  IBalanceParams,
  IBalanceStateData,
  IFinanceActionsResponse
} from './interfaces';
import FetchHelpers from '../../../lib/FetchHelpers';

export class ActionsRequests {
  /**
   * Получает данные для объекта состояния компонента Balance
   * @param params - объект для фильтрации списка. Содержит значения пагинации и фильтра
   * @returns данные для объекта состояния компонента Balance
   */
  static getBalanceStateData = async (params: IBalanceParams): Promise<IBalanceStateData> => {
    const response = await FetchHelpers.getJSON<IFinanceActionsResponse>(
      '/data/actions.json',
      params
    );

    // В данном случае он совпадает с объектом ответа
    return response as IBalanceStateData;
  };
}
