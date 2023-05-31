import { ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button, Image } from 'antd';

const ConnectTable = () => {
  const { message } = App.useApp();
  const dispatch = useDispatch();
  const { marketManage } = useSelector((state) => state);
  const { activeMarketId, tableData } = marketManage;

  return (
    <ProTable
      className="conntct-goods"
      dataSource={tableData}
      rowKey="id"
      manualRequest={true}
      params={{
        id: activeMarketId,
      }}
      request={async (params = {}) => {
        console.log('params: ', params);
        if (params?.id) {
          let obj = {};
          dispatch({
            type: 'marketManage/selectMarket',
            payload: {
              params,
              callback: (data) => {
                obj.data = data.tableData;
                obj.total = data.total;
                obj.success = true;
              },
            },
          });
          return obj;
        } else {
          message.warning('请先选中营销类目');
        }
      }}
      pagination={{
        showSizeChanger: true,
      }}
      columns={columns}
      search={false}
      options={false}
      dateFormatter="string"
      headerTitle={
        <div>
          <p>手动关联商品</p>
          <p style={{ color: 'rgba(0, 0, 0, 0.25)', fontSize: 13 }}>
            手动关联的商品属于强关联，不随商品后台类目变化而变化
          </p>
        </div>
      }
      toolBarRender={() => (
        <Button type="primary" key="primary">
          添加商品
        </Button>
      )}
    />
  );
};
export default ConnectTable;

const columns = [
  {
    title: '商品信息',
    dataIndex: 'item',
    width: 150,
    render: (_, record) => {
      return (
        <div style={{ height: 66, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Image width={66} height={66} src={record?.mainGraph} />
          {/* <Avatar shape="square" size="large" src={record?.mainGraph} /> */}
          <div style={{ flex: 1, marginLeft: 10, textAlign: 'left', height: 66 }}>
            <p
              style={{
                padding: 0,
                margin: 0,
                height: 44,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {record?.itemName}
            </p>
            <p style={{ padding: 0, margin: 0 }}>ID：{record?.id}</p>
          </div>
        </div>
      );
    },
  },
  {
    title: '价格',
    dataIndex: 'address',
    width: 150,
  },
  {
    title: '排序',
    dataIndex: 'address',
    width: 150,
  },
  {
    title: '操作',
    key: '-_-!',
    width: 100,
    fixed: 'right',
    render: () => <a>删除</a>,
  },
];
