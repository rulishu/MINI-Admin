import { selectById } from '@/service/cust/userDetail';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { useDispatch, useParams, useSelector } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Space, Table, Tabs } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import Edit from './EditModal';
import { levelStatus } from './enum';
import { basicItem, columns } from './items';

export default () => {
  const [tab, setTab] = useState('1');
  const dispatch = useDispatch();
  const {
    userDetail: { queryData },
  } = useSelector((state) => state);
  const { id } = useParams();
  const [fans, setFans] = useState([]);

  const { loading, run } = useRequest(selectById, {
    manual: true,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        setFans(result?.records || []);
        // dispatch({
        //   type: 'userDetail/update',
        //   payload: {
        //     queryData: result,
        //   },
        // });
      }
    },
  });

  useEffect(() => {
    dispatch({
      type: 'userDetail/info',
      payload: {
        id,
      },
    });
    run({
      params: { userId: Number(id), sortByTime: 0, fansLevel: Number(tab) },
      pageSize: 100,
      pageNum: 1,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleEdit = (type, data) => {
    dispatch({
      type: 'userDetail/update',
      payload: {
        editType: type,
        editModalVisible: true,
        editData: { ...data, levelName: data.level && levelStatus[Number(data.level)].text },
      },
    });
  };

  const items = [
    {
      label: `直属粉丝`,
      key: '1',
      children: <Table columns={columns} dataSource={fans} rowKey="userId" />,
    },
    {
      label: `跨级粉丝`,
      key: '2',
      children: <Table columns={columns} dataSource={fans} rowKey="userId" />,
    },
    {
      label: `其它粉丝`,
      key: '3',
      children: <Table columns={columns} dataSource={fans} rowKey="userId" />,
    },
  ];

  return (
    <Fragment>
      <Space direction="vertical" style={{ width: '100%' }}>
        <ProCard title="用户信息" headerBordered loading={loading}>
          <ProDescriptions column={4} dataSource={queryData} columns={basicItem({ handleEdit })} />
        </ProCard>

        <ProCard loading={loading}>
          <Tabs
            activeKey={tab}
            size="small"
            items={items}
            onChange={(key) => {
              run({
                params: { userId: Number(id), sortByTime: 0, fansLevel: Number(key) },
                pageSize: 100,
                pageNum: 1,
              });

              setTab(key);
            }}
            destroyInactiveTabPane
          />
        </ProCard>
      </Space>
      <Edit />
    </Fragment>
  );
};
