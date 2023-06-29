import { Divider, Switch, Typography } from 'antd';
import moment from 'moment';
import { Fragment } from 'react';
import { hideEnum, statusEnum } from './enum';

// eslint-disable-next-line no-unused-vars
export const columns = ({ handleEdit }) => [
  {
    title: '活动名称',
    dataIndex: 'activityName',
    hideInTable: true,
  },
  {
    title: '活动信息',
    dataIndex: 'details',
    width: 120,
    hideInSearch: true,
    render: (_, record) => (
      <div>
        <Typography.Text ellipsis={{ tooltip: record.activityName }} style={{ width: 110 }}>
          {record.activityName}
        </Typography.Text>
        <Typography.Text
          ellipsis={{ tooltip: `ID：${record.id}` }}
          style={{ color: '#ccc', width: 110 }}
        >
          ID：{record.id}
        </Typography.Text>
      </div>
    ),
  },
  {
    title: '活动状态',
    dataIndex: 'status',
    width: 90,
    valueEnum: statusEnum,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateRange',
    fieldProps: {},
    search: {
      transform: (value) => {
        return {
          createStartTime: value[0],
          createEndTime: value[1],
        };
      },
    },
    hideInTable: true,
  },
  {
    title: '订单数量/金额',
    dataIndex: 'orderNumber',
    width: 150,
    hideInSearch: true,
    render: () => '-',
  },
  {
    title: '下单人数',
    dataIndex: 'memberType',
    width: 120,
    hideInSearch: true,
    render: () => '-',
  },
  {
    title: '活动时间',
    dataIndex: 'activityStartTime',
    width: 250,
    hideInSearch: true,
    render: (_, record) => (
      <div>
        {moment(record.activityStartTime).format('YYYY-MM-DD HH:mm:ss')} -{' '}
        {moment(record.activityEndTime).format('YYYY-MM-DD HH:mm:ss')}
      </div>
    ),
  },
  {
    title: '显示状态',
    dataIndex: 'appShow',
    valueEnum: hideEnum,
    width: 120,
    render: (_, record) => (
      <Switch onChange={() => handleEdit('editIsShow', record)} checked={record.appShow === 0} />
    ),
  },
  {
    title: '操作',
    width: 140,
    fixed: 'right',
    hideInSearch: true,
    render: (record) => {
      const canEdit = record.status === 0;
      const canLose = record.status === 0 || record.status === 1;
      const canDelete = record.status === 2 || record.status === -1;
      return (
        <div>
          {canEdit && (
            <Fragment>
              <a onClick={() => handleEdit('edit', record)}>编辑</a>
              <Divider type="vertical" />
            </Fragment>
          )}
          {canLose && <a onClick={() => handleEdit('lose', record)}>失效</a>}
          {canLose && canDelete && <Divider type="vertical" />}
          {canDelete && <a onClick={() => handleEdit('delete', record)}>删除</a>}
        </div>
      );
    },
  },
];
