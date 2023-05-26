import { ProDescriptions } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal, Table } from 'antd';
import { basicItem, manageColumn, manageItem } from './items';

export default function Edit() {
  const dispatch = useDispatch();
  const { visible, queryData } = useSelector((state) => state.abnormal);

  const handleCancel = () => {
    dispatch({
      type: 'abnormal/update',
      payload: {
        visible: false,
      },
    });
  };
  return (
    <Modal open={visible} onCancel={handleCancel} footer={false} width={800}>
      <ProDescriptions column={2} title="基本信息" dataSource={queryData} columns={basicItem} />
      <ProDescriptions column={2} title="商品详情" dataSource={queryData} columns={manageItem} />
      <Table
        columns={manageColumn}
        dataSource={queryData.itemabnormal || []}
        rowKey="itemName"
        scroll={{ x: 1300 }}
      />
    </Modal>
  );
}
