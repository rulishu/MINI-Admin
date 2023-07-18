import { info } from '@/service/cust/userDetail';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { useDispatch, useParams, useSelector } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Space, Tabs } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import Edit from './EditModal';
import RenderTable from './Table';
import { levelStatus } from './enum';
import { basicItem } from './items';

export default () => {
  const [tab, setTab] = useState('1');
  const dispatch = useDispatch();
  const {
    userDetail: { queryData },
  } = useSelector((state) => state);
  const { id } = useParams();

  const update = (data) => {
    dispatch({
      type: 'userDetail/update',
      payload: data,
    });
  };

  const { run, loading } = useRequest(info, {
    manual: true,
    onSuccess: ({ code, result }) => {
      if (code === 200) {
        update({ queryData: result });
      }
    },
  });

  useEffect(() => {
    run({ id });
  }, [id]);

  const handleEdit = (type, data) => {
    update({
      editType: type,
      editModalVisible: true,
      editData: { ...data, levelName: data.level && levelStatus[Number(data.level)].text },
    });
  };

  const items = [
    {
      label: `直属粉丝`,
      key: '1',
      children: (
        <RenderTable search={{ userId: Number(id), sortByTime: 0, fansLevel: Number(tab) }} />
      ),
    },
    {
      label: `跨级粉丝`,
      key: '2',
      children: (
        <RenderTable search={{ userId: Number(id), sortByTime: 0, fansLevel: Number(tab) }} />
      ),
    },
    {
      label: `其它粉丝`,
      key: '3',
      children: (
        <RenderTable search={{ userId: Number(id), sortByTime: 0, fansLevel: Number(tab) }} />
      ),
    },
  ];

  return (
    <Fragment>
      <Space direction="vertical" style={{ width: '100%' }}>
        <ProCard title="用户信息" headerBordered loading={loading}>
          <ProDescriptions column={4} dataSource={queryData} columns={basicItem({ handleEdit })} />
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
      <Edit refresh={() => run({ id })} />
    </Fragment>
  );
};
