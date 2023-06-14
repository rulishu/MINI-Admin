import { selectSellPage } from '@/service/goods/productManage';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormSelect, ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button, Form, Image, Input } from 'antd';
const ConnectTable = ({ proTableRef }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { modal } = App.useApp();
  const { marketManage } = useSelector((state) => state);
  const { activeMarketId, tableData } = marketManage;

  const columns = [
    {
      title: '商品信息',
      dataIndex: 'itemName',
      width: 150,
      render: (text, record) => (
        <div
          style={{
            height: 66,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image width={66} height={66} src={record?.itemDto?.mainGraph} />
          <div style={{ flex: 1, marginLeft: 10, textAlign: 'left', height: 66 }}>
            <div
              style={{
                padding: 0,
                margin: 0,
                height: 44,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {record?.itemDto?.itemName}
            </div>
            <p style={{ padding: 0, margin: 0 }}>ID：{record?.itemId}</p>
          </div>
        </div>
      ),
    },
    {
      title: '价格',
      dataIndex: 'price',
      width: 150,
      render: (txt, record) => record?.itemDto?.costPrice,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      width: 150,
      render: (txt, record) => (
        <Input
          defaultValue={record?.sort}
          onChange={() => {}}
          onBlur={(e) => {
            console.log('record: ', record);
            dispatch({
              type: 'marketManage/updateGoodsSort',
              payload: {
                id: record?.id,
                sort: e.target.value,
                callback: (type) => {
                  if (type) {
                    proTableRef?.current?.reload();
                  }
                },
              },
            });
          }}
        />
      ),
    },
    {
      title: '操作',
      key: '-_-!',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <a
          onClick={() => {
            modal.warning({
              autoFocusButton: null,
              closable: true,
              title: '确认删除',
              content: '确定要删除这条商品吗？',
              onOk: () => {
                dispatch({
                  type: 'marketManage/deleteGoods',
                  payload: {
                    id: record?.id,
                    callback: (type) => {
                      if (type) {
                        proTableRef?.current?.reload();
                      }
                    },
                  },
                });
              },
            });
          }}
        >
          删除
        </a>
      ),
    },
  ];

  return (
    <>
      <ProTable
        className="conntct-goods"
        actionRef={proTableRef}
        dataSource={tableData}
        rowKey="id"
        manualRequest={true}
        params={{
          id: activeMarketId,
        }}
        request={async (params = {}) => {
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
          }
        }}
        pagination={{
          showSizeChanger: true,
        }}
        columns={columns}
        search={false}
        options={false}
        scroll={{ x: 800 }}
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
          <ModalForm
            title="添加商品"
            layout="Horizontal"
            trigger={
              <Button disabled={!activeMarketId} type="primary">
                <PlusOutlined />
                添加商品
              </Button>
            }
            form={form}
            autoFocusFirstInput
            modalProps={{
              destroyOnClose: true,
              onCancel: () => console.log('run'),
            }}
            // submitTimeout={2000}
            onFinish={async (values) => {
              dispatch({
                type: 'marketManage/addGoods',
                payload: {
                  id: values?.select,
                  callback: () => {
                    proTableRef?.current?.reload();
                  },
                },
              });
              return true;
            }}
          >
            <ProFormSelect
              name="select"
              label="商品ID"
              debounceTime={800}
              showSearch
              request={async (params) => {
                const { code, result } = await selectSellPage({
                  pageNum: 1,
                  pageSize: 10,
                  keyword: params?.keyWords,
                });
                if (code && code === 200) {
                  return (
                    result?.records.map((item) => ({
                      label: `${item?.itemName}-${item?.id}`,
                      value: item?.id,
                    })) || []
                  );
                }
              }}
              placeholder="请输入商品名称/商品ID"
              rules={[{ required: true, message: 'Please select your country!' }]}
            />
          </ModalForm>
        )}
      />
    </>
  );
};
export default ConnectTable;
