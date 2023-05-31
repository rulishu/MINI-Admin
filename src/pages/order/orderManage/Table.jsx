import { selectPage } from '@/service/order/orderManage';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Table } from 'antd';
import { Fragment, useEffect, useRef } from 'react';
import Push from './Details/Push';
import { columns, expandColumn } from './columns';

export default function SearchTable() {
  const ref = useRef();
  const dispatch = useDispatch();
  const { reload, activeKey } = useSelector((state) => state.orderManage);

  useEffect(() => {
    if (reload) {
      ref?.current?.reload();
    }
  }, [reload]);

  const updateFn = (payload) => {
    dispatch({
      type: 'orderManage/update',
      payload: payload,
    });
  };
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

  const expandedRowRender = (record) => {
    const { itemList = [] } = record;
    return (
      <Table
        columns={expandColumn({ handle, recordData: record })}
        dataSource={itemList}
        pagination={false}
        rowKey="id"
      />
    );
  };

  return (
    <Fragment>
      <ProTable
        headerTitle="订单列表"
        actionRef={ref}
        options={false}
        request={async (params = {}) => {
          const { current, pageSize, startTime, ...formData } = params;
          const { code, result } = await selectPage({
            pageSize,
            pageNum: current,
            startTime: startTime && startTime[0],
            endTime: startTime && startTime[1],
            ...formData,
          });
          if (code === 200) {
            updateFn({ reload: false });
            return {
              data: result.records || [],
              total: result.total,
              success: true,
            };
          }
        }}
        params={{
          [activeKey === '售后中' || activeKey === '已关闭' ? 'afterSaleStatus' : 'status']:
            activeKey === '售后中' ? 1 : activeKey === '已关闭' ? 2 : activeKey,
        }}
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          showSizeChanger: true,
        }}
        cardProps={{
          headStyle: {},
          size: 'small',
          style: {
            padding: 0,
          },
        }}
        cardBordered={true}
        columns={columns({ handle })}
        rowKey="id"
        expandable={{
          expandedRowRender,
        }}
      />
      <Push />
    </Fragment>
  );
}
