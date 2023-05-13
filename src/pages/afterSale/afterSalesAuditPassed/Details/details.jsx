import { ProDescriptions } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal, Table } from 'antd';
import { basicItem, deatilsColumns, detailItem } from './items';

export default ({ info = {} }) => {
  const { detailVisible } = useSelector((state) => state.afterSalesAuditPassed);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'afterSalesAuditPassed/update',
      payload: data,
    });
  };

  return (
    <Modal
      forceRender
      title="详情"
      open={detailVisible}
      onCancel={() => update({ detailVisible: false })}
      width={1000}
    >
      <ProDescriptions column={2} title="基本信息" dataSource={info} columns={basicItem} />
      <ProDescriptions title="商品详情" column={2} dataSource={info} columns={detailItem} />
      <Table
        columns={deatilsColumns}
        dataSource={info.itemList || []}
        rowKey="itemName"
        scroll={{ x: 1300 }}
      />
    </Modal>
  );
};
