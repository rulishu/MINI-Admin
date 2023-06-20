import AModal from '@/components/AModal';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Space, Table, Tabs } from 'antd';
import { useState } from 'react';
import { basicItem, columns } from './items';

export default () => {
  const {
    custManage: { visible },
  } = useSelector((state) => state);
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  const close = () => {
    dispatch({
      type: 'custManage/update',
      payload: {
        visible: false,
      },
    });
  };
  const handleEdit = (type) => {
    dispatch({
      type: 'custManage/update',
      payload: {
        editType: type,
        editModalVisible: true,
      },
    });
  };

  const items = [
    {
      label: `直属粉丝`,
      key: 0,
      children: <Table columns={columns} dataSource={[{ id: 1 }]} rowKey="id" />,
    },
    {
      label: `跨级粉丝`,
      key: 1,
      children: <Table columns={columns} dataSource={[{ id: 1 }]} rowKey="id" />,
    },
    {
      label: `其它粉丝`,
      key: 2,
      children: <Table columns={columns} dataSource={[{ id: 1 }]} rowKey="id" />,
    },
  ];

  return (
    <AModal
      open={visible}
      width={1400}
      onCancel={close}
      footer={
        <div style={{ paddingBottom: 24, paddingRight: 24 }}>
          <Button key="cancel" onClick={close}>
            取消
          </Button>
        </div>
      }
    >
      <ProCard title="用户详情" headerBordered bodyStyle={{ paddingBottom: 0 }}>
        <Space direction="vertical">
          <ProDescriptions
            title="用户信息"
            column={4}
            dataSource={{}}
            columns={basicItem({ handleEdit })}
          />
          <Tabs
            activeKey={tab}
            size="small"
            items={items}
            onChange={(key) => setTab(key)}
            destroyInactiveTabPane
          />
        </Space>
      </ProCard>
    </AModal>
  );
};
