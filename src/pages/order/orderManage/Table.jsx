import { selectPage } from '@/service/order/orderManage';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch, useNavigate, useSelector } from '@umijs/max';
import { App, Skeleton, Table } from 'antd';
import { useRef, useState } from 'react';
import Push from './Details/Push';
import { columns, expandColumns } from './columns';
import './index.less';

export default function SearchTable() {
  const dispatch = useDispatch();
  const {
    orderManage: { activeKey, selectedRows, selectedRowKeys, suppliersList, dataSource },
  } = useSelector((state) => state);
  const { message } = App.useApp();
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const ref = useRef();
  let navigate = useNavigate();
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
  const handle = async (type, data, e) => {
    updateFn({ type: type });
    // 查看详情
    if (type === 'view') {
      dispatch({ type: 'orderManage/selectById', payload: { id: data.id } });
    }
    // 发货
    if (type === 'push') {
      dispatch({ type: 'orderManage/getPushItems', payload: { orderId: data.id } });
    }
    // 复制
    if (type === 'copy') {
      const el = document.createElement('textarea');
      el.value = data.orderNumber;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      message.success('复制成功');
    }
    // 编辑备注
    if (type === 'editRemark') {
      data.edit = true;
      data.oldBackgroundMessage = data.backgroundMessage;
      updateFn({ dataSource: [...dataSource] });
    }
    // 取消编辑备注
    if (type === 'cancelRemark') {
      data.edit = false;
      data.backgroundMessage = data.oldBackgroundMessage;
      updateFn({ dataSource: [...dataSource] });
    }
    // 备注change
    if (type === 'changeRemark') {
      const { value: inputValue } = e.target;
      data.backgroundMessage = inputValue;
    }
    // 保存备注
    if (type === 'saveRemark') {
      data.edit = false;
      updateFn({ dataSource: [...dataSource] });
      dispatch({
        type: 'orderManage/updateInfo',
        payload: {
          backgroundMessage: data.backgroundMessage,
          id: data.id,
        },
      });
    }
    if (type === 'goAfterSale') {
      navigate('/order/afterSales', { state: { ...data } });
    }
  };

  // table参数
  const tableProps = {
    bordered: true,
    actionRef: ref,
    className: 'table_card',
    headerTitle: '订单列表',
    options: false,
    search: {
      labelWidth: 70,
      labelAlign: 'right',
      span: 8,
      style: {
        padding: '24px 0px',
      },
    },
    cardProps: {
      size: 'small',
      style: {
        padding: 0,
      },
    },
    onLoadingChange: (loading) => setTableLoading(loading),
    rowSelection: {
      selectedRows: selectedRows,
      selectedRowKeys: selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) =>
        updateFn({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows }),
    },
    request: async (params = {}) => {
      // eslint-disable-next-line no-unused-vars
      const { current, pageSize, ...formData } = params;
      const { code, result } = await selectPage({
        pageNum: current,
        pageSize: pageSize,
        ...formData,
      });
      if (code && code === 200) {
        setExpandedRowKeys((result.records || []).map((rowKey) => rowKey.id));
        updateFn({ dataSource: result.records || [], total: result.total });
        return {
          total: result.total,
          success: true,
        };
      }
    },
    dataSource: dataSource,
    params: {
      [activeKey === '售后中' ? 'afterSaleStatus' : 'orderStatus']:
        activeKey === '售后中' ? 1 : activeKey,
    },
    columns: columns({
      tableLoading: tableLoading,
      activeKey: activeKey,
      handle,
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
        <Skeleton active loading={tableLoading}>
          <Table
            className="expanded_table_td"
            columns={expandColumns({ rowData: record, handle: handle })}
            dataSource={record.items || []}
            rowKey="id"
            pagination={false}
            rowClassName={() => 'valign-top'}
          />
        </Skeleton>
      ),
      expandRowByClick: true,
      expandIcon: () => null,
      expandedRowKeys: expandedRowKeys,
    },
    rowClassName: () => 'ant-table-row_color',
    pagination: {
      showSizeChanger: true,
      onChange: () => {
        const node = document.querySelector('.ant-layout-content');
        node.scrollTop = 0;
      },
    },
  };
  return (
    <div>
      <ProTable {...tableProps} />
      <Push
        reload={() => {
          ref?.current?.reload?.();
          dispatch({
            type: 'orderManage/getOrderCount',
          });
        }}
      />
    </div>
  );
}
