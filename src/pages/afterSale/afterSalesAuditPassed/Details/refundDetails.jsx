import { useDispatch, useSelector } from '@umijs/max';
import { Modal, Table } from 'antd';
import { columns } from './items';

export default ({ dataSource }) => {
  const { visible } = useSelector((state) => state.afterSalesAuditPassed);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'afterSalesAuditPassed/update',
      payload: data,
    });
  };

  return (
    <Modal title="退款详情" open={visible} onCancel={() => update({ visible: false })} width={1000}>
      <Table columns={columns} dataSource={dataSource} rowKey="id" />
    </Modal>
  );
};
