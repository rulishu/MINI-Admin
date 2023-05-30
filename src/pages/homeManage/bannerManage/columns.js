import { Divider, Image } from 'antd';
import moment from 'moment';
import { Fragment } from 'react';

export const columns = ({ handleEdit }) => [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 40,
    align: 'left',
    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '活动名称',
    dataIndex: 'name',
    width: 90,
    align: 'left',
    hideInSearch: true,
  },
  {
    title: '图片',
    dataIndex: 'path',
    width: 120,
    align: 'left',
    hideInSearch: true,
    render: (text) => (
      <div>
        <Image src={text} width={80} height={80} />
      </div>
    ),
  },
  {
    title: 'Tag/url',
    dataIndex: 'jumpPath',
    width: 120,
    align: 'left',
    hideInSearch: true,
    render: (_, record) => record.jumpPath || record.linkMenuTag || '-',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 120,
    align: 'left',
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    ellipsis: true,
    width: 90,
    valueType: 'select',
    valueEnum: {
      1: {
        text: '已上架',
        status: 'Success',
      },
      0: {
        text: '已下架',
        status: 'Error',
      },
    },
  },
  {
    title: '活动时间',
    width: 120,
    dataIndex: 'showStartTime',
    align: 'left',
    hideInSearch: true,
    render: (_, record) => (
      <div>
        <div>
          开始时间：
          {(record.showStartTime && moment(record.showStartTime).format('YYYY-MM-DD HH:mm:ss')) ||
            '-'}
        </div>
        <div>
          结束时间：
          {(record.showStartTime && moment(record.showStartTime).format('YYYY-MM-DD HH:mm:ss')) ||
            '-'}
        </div>
      </div>
    ),
  },
  {
    title: '操作',
    width: 90,
    align: 'left',
    hideInSearch: true,
    render: (record) => (
      <div>
        <a onClick={() => handleEdit('edit', record)}>编辑</a>
        {record.status === 1 && (
          <Fragment>
            <Divider type="vertical" />
            <a onClick={() => handleEdit('offShelf', record)}>下架</a>
          </Fragment>
        )}
        {record.status === 0 && (
          <Fragment>
            <Divider type="vertical" />
            <a onClick={() => handleEdit('grounding', record)}>上架</a>
          </Fragment>
        )}
      </div>
    ),
  },
];
