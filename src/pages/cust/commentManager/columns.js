import AImage from '@/components/AImage';
import { Switch, Typography } from 'antd';
import moment from 'moment';
import { Fragment } from 'react';
import { levelEnum } from './enum';

export const columns = () => [
  {
    title: '商品名称',
    dataIndex: 'itemName',
    fieldProps: {
      placeholder: '请输入商品名称',
    },
    hideInTable: true,
  },
  {
    title: '商品ID',
    dataIndex: 'itemId',
    fieldProps: {
      placeholder: '请输入商品ID',
    },
    hideInTable: true,
  },
  {
    title: '订单编号',
    dataIndex: 'orderNumber',
    fieldProps: {
      placeholder: '请输入订单编号',
    },
    hideInTable: true,
  },
  {
    title: '评价内容',
    dataIndex: 'consumerName',
    align: 'left',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '评价等级',
    dataIndex: 'level',
    align: 'left',
    width: 90,
    valueEnum: levelEnum,
  },
  {
    title: '订单编号',
    dataIndex: 'id',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '商品信息',
    dataIndex: 'item',
    align: 'left',
    width: 250,
    hideInSearch: true,
    render: (_, record) => {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            {' '}
            <AImage height={80} width={80} src={''} />
          </div>
          <div style={{ marginLeft: 12, width: 250 }}>
            <Typography.Text
              ellipsis={{ tooltip: '乔宣咖啡 挂耳咖啡礼盒' }}
              style={{ fontSize: '14px' }}
            >
              乔宣咖啡 挂耳咖啡礼盒 10g*7包
            </Typography.Text>
            <div style={{ fontSize: '14px', color: '#ccc' }}>
              {(record.attributes || []).map((item, i) => (
                <Fragment key={item.attributeId}>
                  <span> {`${item.attributeName}:${item.value}`}</span>
                  {i !== (record.attributes || []).length - 1 && <span>;</span>}
                </Fragment>
              ))}
            </div>
            <div style={{ fontSize: '14px', color: '#1677ff' }}>ID:3617357357283207361</div>
          </div>
        </div>
      );
    },
  },
  {
    title: '用户信息',
    dataIndex: 'details',
    align: 'left',
    width: 250,
    render: () => {
      return (
        <div style={{ textAlign: 'left', marginLeft: 8, width: 220 }}>
          <div>
            <Typography.Text
              ellipsis={{ tooltip: 'Miracle-' }}
              style={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              Miracle-
            </Typography.Text>
          </div>
          <div>
            <Typography.Text ellipsis={{ tooltip: 'ID:7889878' }} style={{ fontSize: '14px' }}>
              ID:7889878
            </Typography.Text>
          </div>
        </div>
      );
    },
    hideInSearch: true,
  },
  {
    title: '评价时间',
    width: 180,
    dataIndex: 'createTime',
    valueType: 'dateRange',
    fieldProps: {},
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
    render: (_, record) =>
      record.createTime && moment(record.createTime).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '显示状态',
    dataIndex: 'status',
    width: 120,
    hideInSearch: true,
    render: () => <Switch defaultChecked />,
  },
];
