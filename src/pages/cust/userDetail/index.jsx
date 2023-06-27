import { selectById } from '@/service/cust/userDetail';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { useDispatch, useParams, useSelector } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Space, Table, Tabs } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import Edit from './EditModal';
import { basicItem, columns } from './items';

export default () => {
  const [tab, setTab] = useState('1');
  const dispatch = useDispatch();
  const {
    userDetail: { queryData },
  } = useSelector((state) => state);
  const { id } = useParams();

  const { loading, run } = useRequest(selectById, {
    manual: true,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        dispatch({
          type: 'userDetail/update',
          payload: {
            queryData: result,
          },
        });
      }
    },
  });

  useEffect(() => {
    run({ id: id });
  }, [id]);

  // eslint-disable-next-line no-unused-vars
  const handleEdit = (type, data) => {
    // dispatch({
    //   type: 'userDetail/update',
    //   payload: {
    //     editType: type,
    //     editModalVisible: true,
    //   },
    // });
  };

  const items = [
    {
      label: `直属粉丝`,
      key: '1',
      children: <Table columns={columns} dataSource={[{ id: 1 }]} rowKey="id" />,
    },
    {
      label: `跨级粉丝`,
      key: '2',
      children: <Table columns={columns} dataSource={[{ id: 1 }]} rowKey="id" />,
    },
    {
      label: `其它粉丝`,
      key: '3',
      children: <Table columns={columns} dataSource={[{ id: 1 }]} rowKey="id" />,
    },
  ];

  return (
    <Fragment>
      <Space direction="vertical">
        <ProCard title="用户信息" headerBordered loading={loading}>
          <ProDescriptions column={4} dataSource={queryData} columns={basicItem({ handleEdit })} />
        </ProCard>

        <ProCard loading={loading}>
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
