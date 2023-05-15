import { ProDescriptions } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal, Table } from 'antd';
import { basicItem, manageColumn, manageItem } from './items';

export default function Edit() {
  const dispatch = useDispatch();
  const { visible, queryData } = useSelector((state) => state.list);

  const handleCancel = () => {
    dispatch({
      type: 'list/update',
      payload: {
        visible: false,
      },
    });
  };
  return (
    <Modal title="订单详情" open={visible} onCancel={handleCancel} footer={false} width={800}>
      <ProDescriptions column={2} title="基本信息" dataSource={queryData} columns={basicItem} />
      <ProDescriptions column={2} title="商品详情" dataSource={queryData} columns={manageItem} />
      <Table
        columns={manageColumn}
        dataSource={queryData.itemList || []}
        rowKey="itemName"
        scroll={{ x: 1300 }}
      />
    </Modal>
  );
}
