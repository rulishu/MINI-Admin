import { ProDescriptions } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Image, Modal, Table } from 'antd';

export default () => {
  const { visible, queryInfo } = useSelector((state) => state.afterSalesAudit);
  const { itemList, ...others } = queryInfo;
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'afterSalesAudit/update',
      payload: data,
    });
  };

  const columns = [
    {
      title: '商品图片',
      dataIndex: 'mainGraph',
      key: 'mainGraph',
      align: 'center',
      ellipsis: true,
      width: 80,
      render: (value) => {
        return <Image src={value} preview={{ src: value }} />;
      },
    },
    {
      title: '商品名称',
      dataIndex: 'itemName',
      key: 'itemName',
      align: 'center',
      ellipsis: true,
      width: 80,
    },
    {
      title: '规格',
      dataIndex: 'specifications',
      key: 'specifications',
      align: 'center',
      ellipsis: true,
      width: 80,
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model',
      align: 'center',
      ellipsis: true,
      width: 80,
    },
    {
      title: '数量',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      ellipsis: true,
      width: 80,
    },
    {
      title: '商品价格',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      align: 'center',
      ellipsis: true,
      width: 80,
    },
    {
      title: '运费',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      ellipsis: true,
      width: 80,
    },
  ];

  return (
    <Modal open={visible} onCancel={() => update({ visible: false })} width={1000}>
      <ProDescriptions
        column={2}
        title="基本信息"
        dataSource={others}
        columns={[
          {
            title: '订单编号',
            key: 'orderNumber',
            dataIndex: 'orderNumber',
            ellipsis: true,
          },
          {
            title: '卖家信息',
            key: 'companyName',
            dataIndex: 'companyName',
            ellipsis: true,
          },
          {
            title: '手机号',
            key: 'phone',
            dataIndex: 'phone',
            ellipsis: true,
          },
          {
            title: '买家信息',
            key: 'buyerUserName',
            dataIndex: 'buyerUserName',
            ellipsis: true,
          },
        ]}
      />

      <ProDescriptions
        title="商品详情"
        column={2}
        dataSource={others}
        columns={[
          {
            title: '下单时间',
            key: 'orderCreateTime',
            dataIndex: 'orderCreateTime',
            ellipsis: true,
          },
          {
            title: '付款时间',
            key: 'payDate',
            dataIndex: 'payDate',
            ellipsis: true,
          },
          {
            title: '开票状态',
            key: 'isOpenInvoice',
            dataIndex: 'isOpenInvoice',
            valueType: 'select',
            valueEnum: {
              1: {
                text: '已开票',
                status: 'Success',
              },
              0: {
                text: '未开票',
                status: 'Error',
              },
            },
          },
          {
            title: '售后申请原因',
            key: 'reason',
            dataIndex: 'reason',
            ellipsis: true,
          },
          {
            title: '售后问题描述',
            key: 'reasonInfo',
            dataIndex: 'reasonInfo',
            ellipsis: true,
          },
          {
            title: '图片描述',
            key: 'text',
            dataIndex: 'text',
            ellipsis: true,
          },
          {
            title: '售后审批状态',
            key: 'status',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: {
              1: {
                text: '审核通过',
                status: 'Success',
              },
              2: {
                text: '审核拒绝',
                status: 'Error',
              },
            },
          },
        ]}
      />
      <Table columns={columns} dataSource={itemList} rowKey="itemName" />
    </Modal>
  );
};
