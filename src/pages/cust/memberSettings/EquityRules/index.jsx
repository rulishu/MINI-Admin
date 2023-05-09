import { CardPro } from '@antdp/antdp-ui';
import { useModel } from '@umijs/max';
import { Button, Popconfirm, Space } from 'antd';
import Modals from './Modals.jsx';
import SearchTable from './SearchTable';

const EquityRules = () => {
  const {
    store,
    store: { visible },
    setStore,
  } = useModel('equityRules', (model) => ({ ...model }));

  const onAdd = () => {
    setStore({ ...store, visible: true });
  };

  const onEdit = () => {
    setStore({ ...store, visible: true });
  };

  return (
    <div>
      {visible ? (
        <Modals />
      ) : (
        <CardPro>
          <SearchTable onEdit={onEdit} onAdd={onAdd} />
        </CardPro>
      )}
    </div>
  );
};
export default EquityRules;
