import { CardPro } from '@antdp/antdp-ui';
import { useModel } from '@umijs/max';
import Modals from './Modals';
import SearchTable from './SearchTable';
const MembershipLevel = () => {
  const {
    store,
    store: { visible },
    setStore,
  } = useModel('membershipLevel', (model) => ({ ...model }));

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
export default MembershipLevel;
