import moment from 'moment';
import { ProfitSharingGoodComp, ProfitSharingUser } from './component';
import { dividendTypeEnum, flowStatusEnum } from './enum';

export const columns = [
  {
    title: '商品信息',
    dataIndex: 'mainGraph',
    key: 'mainGraph',
    width: 250,
    render: (_, record) => (
      <ProfitSharingGoodComp amount={record.amount} record={record.itemSkuDto} />
    ),
    hideInSearch: true,
  },
  {
    title: 'sku实付金额',
    width: 120,
    dataIndex: 'paidInAmount',
    key: 'paidInAmount',
    hideInSearch: true,
    render: (_, record) => `￥${record.paidInAmount}`,
  },
  {
    title: '分润类型',
    dataIndex: 'dividendType',
    width: 120,
    key: 'dividendType',
    render: (_, record) => record.dividendType && dividendTypeEnum[record.dividendType].text,
    hideInSearch: true,
  },
  {
    title: '分润比例',
    dataIndex: 'percent',
    width: 120,
    key: 'percent',
    hideInSearch: true,
    render: (_, record) => `${record.percent || '-'}%`,
  },
  {
    title: '分润金额',
    dataIndex: 'dividendFunds',
    width: 90,
    key: 'dividendFunds',
    hideInSearch: true,
  },
  {
    title: '分润对象',
    dataIndex: 'beneficiary',
    width: 250,
    key: 'beneficiary',
    render: (_, record) => <ProfitSharingUser width={250} record={record} />,
    hideInSearch: true,
  },
  {
    title: '分润单状态',
    dataIndex: 'flowStatus',
    width: 150,
    key: 'flowStatus',
    render: (_, record) => flowStatusEnum[record.flowStatus].text,
    hideInSearch: true,
  },
  {
    title: '结算时间',
    dataIndex: 'unfreezingTime',
    width: 150,
    key: 'unfreezingTime',
    hideInSearch: true,
    render: (_, record) =>
      (record.unfreezingTime && moment(record.unfreezingTime).format('YYYY-MM-DD HH:mm:ss')) || '-',
  },
];
