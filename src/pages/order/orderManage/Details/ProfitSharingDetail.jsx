import AModal from '@/components/AModal';
import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Table } from 'antd';
import { profitSharingColumns } from './items';

export default () => {
  const dispatch = useDispatch();
  const {
    orderManage: { profitSharingVisible },
  } = useSelector((state) => state);

  const updateFn = (payload) => {
    dispatch({
      type: 'orderManage/update',
      payload: payload,
    });
  };
  return (
    <AModal
      open={profitSharingVisible}
      width={1200}
      onCancel={() => updateFn({ profitSharingVisible: false })}
      footer={
        <div style={{ paddingBottom: 24, paddingRight: 24 }}>
          <Button key="cancel" onClick={() => updateFn({ profitSharingVisible: false })}>
            取消
          </Button>
        </div>
      }
    >
      <ProCard title="分润详情" headerBordered bodyStyle={{ paddingBottom: 0 }}>
        <h4>订单编号：123456789 </h4>
        <Table
          scroll={{ x: 1300 }}
          columns={profitSharingColumns}
          dataSource={[{ id: 1 }]}
          rowKey="id"
          pagination={false}
        />
      </ProCard>
    </AModal>
  );
};
