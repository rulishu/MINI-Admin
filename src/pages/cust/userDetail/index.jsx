import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';
import { Space, Table, Tabs } from 'antd';
import { Fragment, useState } from 'react';
import Edit from './EditModal';
import { basicItem, columns } from './items';

export default () => {
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();

  const handleEdit = (type) => {
    dispatch({
      type: 'userDetail/update',
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
    <Fragment>
      <Space direction="vertical">
        <ProCard title="用户信息" headerBordered>
          <ProDescriptions column={4} dataSource={{}} columns={basicItem({ handleEdit })} />
        </ProCard>

        <ProCard>
          <Tabs
            activeKey={tab}
            size="small"
            items={items}
            onChange={(key) => setTab(key)}
            destroyInactiveTabPane
          />
        </ProCard>
      </Space>
      <Edit />
    </Fragment>
  );
};
