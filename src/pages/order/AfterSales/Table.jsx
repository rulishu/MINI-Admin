import {
  BetaSchemaForm,
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button, Form, Table } from 'antd';
import { Fragment, useEffect, useRef } from 'react';
import { columns, expandColumns, searchItem } from './columns';
import { afterSaleEnums } from './enum';
import './index.less';

export default function SearchTable() {
  const [form] = Form.useForm();
  const formRef = useRef();
  const { modal } = App.useApp();
  const dispatch = useDispatch();
  const {
    aftersales: {
      activeKey,
      pageSize,
      // 第几页
      pageNum,
      // 总条数
      total,
      // 数据
      dataSource,
      searchForm,
    },
    loading,
  } = useSelector((state) => state);

  useEffect(() => {
    console.log('formData', formRef?.current?.getFieldsValue());
    formRef?.current?.setFieldsValue({
      ...searchForm,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchForm]);

  const updateFn = (payload) => {
    dispatch({
      type: 'aftersales/update',
      payload: payload,
    });
  };

  // useEffect(() => {
  //   dispatch({
  //     type: 'aftersales/selectByPage',
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handle = async (type, data) => {
    updateFn({ type: type });
    if (type === 'view') {
      // const { code, result } = await details(data?.id);
      // if (code === 200) {
      //   updateFn({ queryData: result, visible: true });
      // }
      updateFn({ queryData: data, visible: true });
    }
    if (type === 'push') {
      updateFn({
        pushVisible: true,
        pushData: { ...data, list: [{ id: 1, status: 'open', number: 10 }] },
      });
    }
  };

  const addModal = ({ title, content, onOk }) => {
    modal.confirm({
      autoFocusButton: null,
      closable: true,
      title,
      okText: title,
      onCancel: () => {},
      cancelText: '取消',
      content,
      onOk,
    });
  };

  const handlerAction = (_, record) => {
    if (activeKey === '1') {
      if (record?.orderObj?.afterServiceType === 1 || record?.orderObj?.afterServiceType === 3) {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                addModal({
                  title: '确认退款',
                  content: (
                    <>
                      <p>售后类型： {afterSaleEnums?.[record?.orderObj?.afterServiceType]}</p>
                      <p>退款金额：￥{record?.totalPrice}</p>
                    </>
                  ),

                  onOk: () => {
                    dispatch({
                      type: 'aftersales/refundApply',
                      payload: {
                        record,
                        // afterServiceCode: record?.afterServiceCode,
                        // status: 3,
                      },
                    });
                  },
                });
              }}
            >
              同意退款
            </Button>
            <Button
              type="link"
              onClick={() => {
                addModal({
                  title: '拒绝退款',
                  content: (
                    <p>
                      {record?.orderObj?.afterServiceType === 1
                        ? '确认拒绝退款吗?'
                        : '确认拒绝后,用户无法再次发起当前sku的售后申请,确认拒绝吗?'}
                    </p>
                  ),
                  onOk: () => {
                    dispatch({
                      type: 'aftersales/updateOrderGoodsStatus',
                      payload: {
                        id: record?.orderObj?.id
                          ? Number(record?.orderObj?.id)
                          : record?.orderObj?.id,
                        status: 2,
                      },
                    });
                  },
                });
              }}
            >
              拒绝退款
            </Button>
          </>
        );
      }
      if (record?.orderObj?.afterServiceType === 2) {
        return (
          <>
            <ModalForm
              title="同意退货"
              form={form}
              layout="horizontal"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              trigger={<Button type="link">同意退货</Button>}
              autoFocusFirstInput
              modalProps={{
                destroyOnClose: true,
                onCancel: () => console.log('run'),
              }}
              initialValues={{
                afterServiceType: afterSaleEnums?.[record?.orderObj?.afterServiceType],
              }}
              submitTimeout={2000}
              onFinish={async (values) => {
                await dispatch({
                  type: 'aftersales/updateOrderGoodsStatus',
                  payload: {
                    id: record?.orderObj?.id ? Number(record?.orderObj?.id) : record?.orderObj?.id,
                    status: 1,
                    returnAddress: values?.returnAddress,
                  },
                });
                return true;
              }}
            >
              <ProFormText
                name="afterServiceType"
                label="售后类型"
                fieldProps={{
                  disabled: true,
                  bordered: false,
                }}
              />
              <ProFormTextArea
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="returnAddress"
                label="退货地址"
                placeholder="请输入退货地址"
              />
            </ModalForm>
            <Button
              type="link"
              onClick={() => {
                addModal({
                  title: '拒绝退货',
                  content: <p>确认拒绝后,用户无法再次发起当前sku的售后申请,确认拒绝吗?</p>,
                  onOk: () => {
                    //
                    dispatch({
                      type: 'aftersales/updateOrderGoodsStatus',
                      payload: {
                        id: record?.orderObj?.id
                          ? Number(record?.orderObj?.id)
                          : record?.orderObj?.id,
                        status: 2,
                      },
                    });
                  },
                });
              }}
            >
              拒绝退货
            </Button>
          </>
        );
      }
    }

    if (activeKey === '4' && record?.orderObj?.afterServiceType === 2) {
      return (
        <>
          <Button
            type="link"
            onClick={() => {
              addModal({
                title: '确认收货',
                content: (
                  <>
                    <p>确认收货后，款项将退还用户</p>
                    <p>退款金额：￥{record?.totalPrice}</p>
                  </>
                ),
                onOk: () => {
                  dispatch({
                    type: 'aftersales/refundApply',
                    payload: {
                      record,
                    },
                  });
                },
              });
            }}
          >
            确认收货
          </Button>
          <Button
            type="link"
            onClick={() => {
              addModal({
                title: '拒绝收货',
                content: <p>确认拒绝后,用户无法再次发起当前sku的售后申请,确认拒绝吗?</p>,
                onOk: () => {
                  dispatch({
                    type: 'aftersales/updateOrderGoodsStatus',
                    payload: {
                      id: record?.orderObj?.id
                        ? Number(record?.orderObj?.id)
                        : record?.orderObj?.id,
                      status: 2,
                    },
                  });
                },
              });
            }}
          >
            拒绝收货
          </Button>
        </>
      );
    }
  };

  // orderTable props
  const orderTableProps = {
    className: 'wrap-table-align',
    rowSelection: {
      // selectedRows: selectedRows,
      // selectedRowKeys: selectedRowKeys,
      // onChange: (selectedRowKeys, selectedRows) =>
      //   updateFn({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows }),
    },
    pagination: {
      current: pageNum,
      pageSize,
      total,
      onChange: (page, pageSize) => {
        dispatch({
          type: 'aftersales/update',
          payload: { pageNum: page, pageSize: pageSize },
        });
        dispatch({ type: 'aftersales/selectByPage' });
      },
      showTotal: (total) => `第 ${pageNum}-${dataSource.length} 条/总共 ${total} 条`,
    },
    bordered: true,
    dataSource,
    columns: columns({ handle }),
    loading: loading.effects['aftersales/selectByPage'],
    rowKey: 'id',
    scroll: { x: 1300 },
    expandable: {
      showExpandColumn: false,
      expandedRowRender: (record) => (
        <Table
          className="expanded_table_td"
          columns={expandColumns({ rowData: record, handlerAction })}
          dataSource={record?.items.map((item) => ({ ...item, orderObj: record })) || []}
          rowKey="id"
          pagination={false}
          rowClassName={() => 'valign-top'}
        />
      ),
      expandRowByClick: true,
      expandIcon: () => null,
      expandedRowKeys: dataSource.map((rowKey) => rowKey.id),
    },
    rowClassName: () => 'ant-table-row_color',
  };

  return (
    <Fragment>
      <BetaSchemaForm
        formRef={formRef}
        className="after-search-form"
        // initialValues={searchForm}
        labelAlign="right"
        labelWidth={70}
        layoutType="QueryFilter"
        onFinish={(values) => {
          console.log('values: ', values);
          updateFn({ searchForm: values, pageNum: 1 });
          dispatch({ type: 'aftersales/selectByPage' });
        }}
        onReset={() => {
          updateFn({ searchForm: {}, pageNum: 1 });
          dispatch({ type: 'aftersales/selectByPage' });
        }}
        columns={searchItem(dispatch, activeKey)}
      />
      <Table {...orderTableProps} />
    </Fragment>
  );
}
