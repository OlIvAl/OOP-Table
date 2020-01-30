import React from 'react';
import { Table } from './Table';
import { observable } from 'mobx';
import { RootStore } from '../../store/RootStore';
import { StoreContext } from '../../index';
import { BalanceTableState } from './state';
import { observer } from 'mobx-react-lite';
import { FinanceActionsDataService } from './services/FinanceActionsDataService';

const BalanceTable: React.FC = (): JSX.Element | null => {
  const getFinanceActionsService = new FinanceActionsDataService();
  const { financeActionsStore } = React.useContext<RootStore>(StoreContext);
  const [balanceTableState] = React.useState<BalanceTableState>(() =>
    observable(new BalanceTableState(financeActionsStore, getFinanceActionsService))
  );

  React.useEffect(() => {
    balanceTableState.init();

    return balanceTableState.dispose;
  }, [balanceTableState]);

  const table = balanceTableState.table;

  if (!table || !table.columns) {
    return null;
  }

  const columns = [
    {
      Header: () => 'Source',
      headerClassName: table.columns.source.headerClassName,
      accessor: table.columns.source.accessor
    },
    {
      Header: () => 'Created at',
      accessor: table.columns.created_at.accessor,
      headerClassName: table.columns.created_at.headerClassName
    },
    {
      Header: () => 'Updated at',
      accessor: table.columns.updated_at.accessor,
      headerClassName: table.columns.updated_at.headerClassName
    },
    {
      Header: () => 'Description',
      headerClassName: table.columns.description.headerClassName,
      accessor: table.columns.description.accessor
    },
    {
      Header: () => 'Price',
      headerClassName: table.columns.price.headerClassName,
      accessor: table.columns.price.accessor
    },
    {
      Header: () => 'Total profit',
      headerClassName: table.columns.total_profit.headerClassName,
      accessor: table.columns.total_profit.accessor
    }
  ];

  return (
    <section className="balance_actions_table">
      <Table
        data={table.rows}
        columns={columns}
        loading={balanceTableState.loading}
      />
    </section>
  );
};

export default observer(BalanceTable);