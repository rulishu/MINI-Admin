import OrderTable from '@/components/OrderTable';
import { CopyOutlined } from '@ant-design/icons';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Avatar, Divider, Space } from 'antd';
import { Fragment, useEffect, useRef } from 'react';
import Push from './Details/Push';
import { columns, searchItem } from './columns';

export default function SearchTable() {
  const tableRef = useRef();
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
    updateFn({ type: type });
    if (type === 'view') {
      // const { code, result } = await details(data?.id);
      // if (code === 200) {
      //   updateFn({ queryData: result, visible: true });
      // }
      updateFn({ queryData: { ...data }, visible: true });
    }
    if (type === 'push') {
      updateFn({
        pushVisible: true,
        pushData: { ...data, list: [{ id: 1, status: 'open', number: 10 }] },
      });
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
    ref: tableRef,
    pagination: {
      pageNum,
      pageSize,
      total,
      goToPage: (page, pageSize) => {
        dispatch({
          type: 'orderManage/goToPage',
          payload: { pageNum: page, pageSize: pageSize },
        });
      },
    },
    dataSource,
    renderColumnHeader: (row) => (
      <Space size="large">
        <span>
          订单编号：<span>{row.orderNumber}</span>{' '}
          <CopyOutlined onClick={() => handleCopy(row.orderNumber)} style={{ color: '#1677ff' }} />
        </span>
        <span>下单时间：{row.createTime || '-'}</span>
        <span>
          {row.userName && <span>{row.userName}</span>}{' '}
          {row.userId && <span>ID：{row.userId}</span>}
        </span>
      </Space>
    ),
    renderColumnOperate: (record) => (
      <div>
        <a onClick={() => handle('view', record)}>详情</a>
        <Divider type="vertical" />
        <a onClick={() => handle('push', record)}>发货</a>
      </div>
    ),
    columns: columns({ handle }),
    loading: loading.effects['orderManage/selectByPage'],
    rowSelection: false,
    rowKey: (record) => record.id,
    scroll: { x: 1300 },
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
      <OrderTable {...orderTableProps} />
      <Push />
    </Fragment>
  );
}
