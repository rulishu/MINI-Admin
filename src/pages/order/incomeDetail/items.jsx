import { ProfitSharingGoodComp, ProfitSharingUser } from '@/pages/order/orderManage/component';

export const profitSharingColumns = [
  {
    title: '商品信息',
    dataIndex: 'mainGraph',
    key: 'mainGraph',
    width: 250,
    render: (_, record) => <ProfitSharingGoodComp record={record} />,
  },
  {
    title: 'sku实付金额',
    dataIndex: 'price',
    key: 'price',
    render: () => `￥120.00`,
  },
  {
    title: '分润类型',
    dataIndex: 'price1',
    width: 90,
    key: 'price1',
    render: () => (
      <div>
        <div>经销分润</div>
        <div>-自购</div>
      </div>
    ),
  },
  {
    title: '分润比例',
    dataIndex: 'price2',
    width: 90,
    key: 'price2',
    render: () => `30%`,
  },
  {
    title: '分润对象',
    dataIndex: 'price3',
    width: 250,
    key: 'price3',
    render: () => <ProfitSharingUser width={250} />,
  },
  {
    title: '分润单状态',
    dataIndex: 'price4',
    width: 150,
    key: 'price4',
    render: () => `未结算`,
  },
  {
    title: '结算时间',
    dataIndex: 'price5',
    width: 150,
    key: 'price5',
    render: () => `2023-10-10 10:10:10`,
  },
];
