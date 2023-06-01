import OrderTable from '@/components/OrderTable';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Space, Tag, Typography } from 'antd';
import { Fragment, useEffect } from 'react';
import { columns, searchItem } from './columns';
const { Paragraph } = Typography;

export default function SearchTable({ key }) {
  console.log('key: ', key);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const {
    aftersales: {
      pageSize,
      // 第几页
      pageNum,
      // 总条数
      total,
      // 数据源
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

  // orderTable props
  const orderTableProps = {
    pagination: {
      pageNum,
      pageSize,
      total,
      goToPage: (page, pageSize) => {
        dispatch({
          type: 'aftersales/goToPage',
          payload: { pageNum: page, pageSize: pageSize },
        });
      },
    },
    dataSource: [],
    renderColumnHeader: (row) => (
      <Space size="large" align="center">
        <Paragraph
          style={{ margin: 0 }}
          copyable={{
            text: row.orderNumber,
          }}
        >
          订单编号：{row.orderNumber}
        </Paragraph>
        <Paragraph
          style={{ margin: 0 }}
          copyable={{
            text: row.orderNumber,
          }}
        >
          售后编号：{row.orderNumber}
        </Paragraph>

        <span>申请时间：{row.createTime}</span>
        <Tag>未发货待退款</Tag>
      </Space>
    ),
    renderColumnOperate: () => <div />,
    columns: columns({ handle }),

    loading: loading.effects['aftersales/selectByPage'],
    rowSelection: {
      selectedRow: [],
      onChange: (selectedRow) => console.log('selectedRow', selectedRow),
    },
    // rowKey: (record) => record.id + record.orderNumber,
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
        columns={searchItem()}
      />
      <OrderTable {...orderTableProps} />
    </Fragment>
  );
}
