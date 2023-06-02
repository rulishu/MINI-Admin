import { BetaSchemaForm } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Avatar, Space, Table } from 'antd';
import { Fragment, useEffect } from 'react';
import Push from './Details/Push';
import { columns, expandColumns, searchItem } from './columns';
import './index.less';

export default function SearchTable() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const {
    orderManage: {
      pageSize,
      // 第几页
      pageNum,
      // 总条数
      total,
      // 数据源
      dataSource,
      suppliersList,
      userList,
    },
    loading,
  } = useSelector((state) => state);
  const updateFn = (payload) => {
    dispatch({
      type: 'orderManage/update',
      payload: payload,
    });
  };

  useEffect(() => {
    dispatch({
      type: 'orderManage/all',
    });
    dispatch({
      type: 'orderManage/selectByPage',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 操作
  const handle = async (type, data) => {
    // console.log('type', type, 'data', data);
    updateFn({ type: type });
    if (type === 'view') {
      // const { code, result } = await details(data?.id);
      // if (code === 200) {
      //   updateFn({ queryData: result, visible: true });
      // }
      updateFn({ queryData: { ...data }, visible: true });
    }
    if (type === 'push') {
      dispatch({ type: 'orderManage/getPushItems', payload: { orderId: data.id } });
    }
  };

  // 筛选条件模糊搜索
  const handleSearch = (type, searchParams) => {
    dispatch({
      type: `orderManage/${type === 'user' ? 'getUserList' : 'getSuppliersList'}`,
      payload: searchParams,
    });
  };

  const handleCopy = (orderNumber) => {
    const el = document.createElement('textarea');
    el.value = orderNumber;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  // orderTable参数
  const orderTableProps = {
    pagination: {
      page: pageNum,
      pageSize,
      total,
      onChange: (page, pageSize) => {
        dispatch({
          type: 'orderManage/goToPage',
          payload: { pageNum: page, pageSize: pageSize },
        });
      },
      showTotal: (total) => `第 ${pageNum}-${dataSource.length} 条/总共 ${total} 条`,
    },
    dataSource,
    columns: columns({ handle, handleCopy }),
    loading: loading.effects['orderManage/selectByPage'],
    rowSelection: false,
    rowKey: 'id',
    scroll: { x: 1300 },
    border: true,
    expandable: {
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
      expandedRowKeys: dataSource.map((rowKey) => rowKey.id),
    },
    rowClassName: () => 'ant-table-row_color',
  };

  return (
    <Fragment>
      <BetaSchemaForm
        labelWidth="auto"
        layoutType="QueryFilter"
        span={8}
        onFinish={(values) => {
          updateFn({ searchForm: values });
          dispatch({ type: 'orderManage/selectByPage' });
        }}
        onReset={() => {
          updateFn({ searchForm: {} });
          dispatch({ type: 'orderManage/selectByPage' });
        }}
        columns={searchItem({
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
        })}
      />
      <Table {...orderTableProps} />
      <Push />
    </Fragment>
  );
}
