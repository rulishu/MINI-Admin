import {
  BetaSchemaForm,
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button, Divider, Table, message } from 'antd';
import { Fragment, useEffect } from 'react';
import { columns, expandColumns, searchItem } from './columns';
import './index.less';

export default function SearchTable() {
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
    },
    loading,
  } = useSelector((state) => state);
  console.log('dataSource: ', dataSource);

  const updateFn = (payload) => {
    dispatch({
      type: 'aftersales/update',
      payload: payload,
    });
  };

  useEffect(() => {
    dispatch({
      type: 'aftersales/selectByPage',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const addModal = (title, content, onOk) => {
    modal.warning({
      autoFocusButton: null,
      closable: true,
      title,
      content,
      onOk,
    });
  };

  const handlerAction = (_, record) => {
    if (
      (activeKey === '1' && record?.afterSaleStatus === '待审核') ||
      (activeKey === '2' && record?.afterSaleStatus === '待审核')
    ) {
      return (
        <>
          <Button
            type="link"
            onClick={() => {
              addModal({
                title: '确认退款',
                content: (
                  <>
                    <p>售后类型：未发货仅退款</p>
                    <p>退款金额：￥210.00</p>
                  </>
                ),
                onOk: () => {
                  //
                },
              });
            }}
          >
            同意退款
          </Button>
          <Divider type="vertical" />
          <Button
            type="link"
            onClick={() => {
              addModal({
                title: '拒绝退款',
                content: (
                  <>
                    <p>确认拒绝退款吗？</p>
                  </>
                ),
                onOk: () => {
                  //
                },
              });
            }}
          >
            拒绝退款
          </Button>
        </>
      );
    }
    if (activeKey === '3' && record?.afterSaleStatus === '待审核') {
      return (
        <>
          <ModalForm
            title="新建表单"
            trigger={<Button type="link">同意退货</Button>}
            autoFocusFirstInput
            modalProps={{
              destroyOnClose: true,
              onCancel: () => console.log('run'),
            }}
            submitTimeout={2000}
            onFinish={async (values) => {
              console.log(values.name);
              message.success('提交成功');
              return true;
            }}
          >
            <ProFormText name="name" label="售后类型" />
            <ProFormTextArea name="text" label="退货地址" placeholder="请输入退货地址" />
          </ModalForm>
          <Divider type="vertical" />
          <Button
            type="link"
            onClick={() => {
              addModal({
                title: '确认退款',
                content: (
                  <>
                    <p>售后类型：未发货仅退款</p>
                    <p>退款金额：￥210.00</p>
                  </>
                ),
                onOk: () => {
                  //
                },
              });
            }}
          >
            拒绝退货
          </Button>
        </>
      );
    }
    if (activeKey === '3' && record?.afterSaleStatus === '待平台收货') {
      return (
        <>
          <Button
            type="link"
            onClick={() => {
              addModal({
                title: '确认退款',
                content: (
                  <>
                    <p>售后类型：未发货仅退款</p>
                    <p>退款金额：￥210.00</p>
                  </>
                ),
                onOk: () => {
                  //
                },
              });
            }}
          >
            确认收货
          </Button>
          <Divider type="vertical" />
          <Button
            type="link"
            onClick={() => {
              addModal({
                title: '确认退款',
                content: (
                  <>
                    <p>售后类型：未发货仅退款</p>
                    <p>退款金额：￥210.00</p>
                  </>
                ),
                onOk: () => {
                  //
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
      pageNum,
      pageSize,
      total,
      onChange: (page, pageSize) => {
        dispatch({
          type: 'aftersales/goToPage',
          payload: { pageNum: page, pageSize: pageSize },
        });
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
          dataSource={record?.items || []}
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
        labelWidth="auto"
        layoutType="QueryFilter"
        onFinish={(values) => {
          updateFn({ searchForm: values });
          dispatch({ type: 'aftersales/selectByPage' });
        }}
        onReset={() => {
          updateFn({ searchForm: {} });
          dispatch({ type: 'aftersales/selectByPage' });
        }}
        columns={searchItem(dispatch, activeKey)}
      />
      <Table {...orderTableProps} />
    </Fragment>
  );
}
