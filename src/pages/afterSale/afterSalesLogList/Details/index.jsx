import { ProDescriptions } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal, Table } from 'antd';
import { basicItem, columns, detailItem } from './items';

export default () => {
  const { visible, queryInfo } = useSelector((state) => state.afterSalesLogList);
  const { itemList, ...others } = queryInfo;
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'afterSalesLogList/update',
      payload: data,
    });
  };

  return (
    <Modal open={visible} onCancel={() => update({ visible: false })} width={1000}>
      <ProDescriptions column={2} title="基本信息" dataSource={others} columns={basicItem} />
      <ProDescriptions title="商品详情" column={2} dataSource={others} columns={detailItem} />
      <Table columns={columns} dataSource={itemList} rowKey="itemName" scroll={{ x: 1300 }} />
    </Modal>
  );
};
