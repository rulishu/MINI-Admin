import { selectPage } from '@/service/order/orderManage';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Avatar, Space, Table } from 'antd';
import { Fragment, useRef, useState } from 'react';
import Push from './Details/Push';
import { columns, expandColumns } from './columns';
import './index.less';

export default function SearchTable() {
  const dispatch = useDispatch();
  const {
    orderManage: { activeKey, selectedRows, selectedRowKeys, suppliersList, userList },
  } = useSelector((state) => state);
  const { message } = App.useApp();
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const ref = useRef();
  const updateFn = (payload) => {
    dispatch({
      type: 'orderManage/update',
      payload: payload,
    });
  };

  // 筛选条件模糊搜索
  const handleSearch = (type, searchParams) => {
    dispatch({
      type: `orderManage/${type === 'user' ? 'getUserList' : 'getSuppliersList'}`,
      payload: searchParams,
    });
  };

  // 操作
  const handle = async (type, data) => {
    updateFn({ type: type });
    if (type === 'view') {
      dispatch({ type: 'orderManage/selectById', payload: { id: data.id } });
    }
    if (type === 'push') {
      dispatch({ type: 'orderManage/getPushItems', payload: { orderId: data.id } });
    }
    if (type === 'copy') {
      const el = document.createElement('textarea');
      el.value = data.orderNumber;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      message.success('复制成功');
    }
  };

  // table参数
  const tableProps = {
    bordered: true,
    actionRef: ref,
    className: 'table_card',
    headerTitle: '订单列表',
    options: false,
    search: { labelWidth: 'auto', span: 8 },
    cardProps: {
      size: 'small',
      style: {
        padding: 0,
      },
    },
    rowSelection: {
      selectedRows: selectedRows,
      selectedRowKeys: selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) =>
        updateFn({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows }),
    },
    request: async (params = {}) => {
      const { current, pageSize, ...formData } = params;
      const { code, result } = await selectPage({
        pageNum: current,
        pageSize,
        ...formData,
      });
      if (code && code === 200) {
        setExpandedRowKeys((result.records || []).map((rowKey) => rowKey.id));
        return {
          data: result.records || [],
          total: result.total,
          success: true,
        };
      }
    },
    params: {
      [activeKey === '售后中' ? 'afterSaleStatus' : 'orderStatus']:
        activeKey === '售后中' ? 1 : activeKey,
    },
    columns: columns({
      handle,
      userId: {
        options: userList.map((item) => ({
          label: (
            <Space>
              <Avatar src={item.headUrl} />
              {item.label}-{item.mobile}
            </Space>
          ),
          value: item.value,
        })),
        onFocus: () => handleSearch('user', { pageNum: 1, pageSize: 20 }),
        onSearch: (value) => handleSearch('user', { pageNum: 1, pageSize: 20, keyWord: value }),
      },
      supplierName: {
        options: suppliersList,
        onFocus: () => handleSearch('supplier', { pageNum: 1, pageSize: 20 }),
        onSearch: (value) =>
          handleSearch('supplierName', { pageNum: 1, pageSize: 20, supplierName: value }),
      },
    }),
    rowKey: 'id',
    scroll: { x: 1300 },
    expandable: {
      showExpandColumn: false,
      expandedRowRender: (record) => (
        <Table
          className="expanded_table_td"
          columns={expandColumns({ rowData: record })}
          dataSource={record.items || []}
          rowKey="id"
          pagination={false}
          rowClassName={() => 'valign-top'}
        />
      ),
      expandRowByClick: true,
      expandIcon: () => null,
      expandedRowKeys: expandedRowKeys,
    },
    rowClassName: () => 'ant-table-row_color',
  };

  return (
    <Fragment>
      <ProTable {...tableProps} />
      <Push
        reload={() => {
          ref?.current?.reload?.();
          dispatch({
            type: 'orderManage/getOrderCount',
          });
        }}
      />
    </Fragment>
  );
}
