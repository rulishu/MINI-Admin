import { BetaSchemaForm } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal, Table } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import './../orderManage/index.less';
import { columns, expandColumns, searchItem } from './columns';

export default function SearchTable() {
  const dispatch = useDispatch();
  const {
    aftersales: {
      activeKey,
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // orderTable props
  const orderTableProps = {
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
    dataSource,
    columns: columns({ handle }),
    loading: loading.effects['aftersales/selectByPage'],
    rowSelection: false,
    rowKey: 'id',
    scroll: { x: 1300 },
    border: true,
    expandable: {
      expandedRowRender: (record) => (
        <Table
          className="expanded_table_td"
          columns={expandColumns({ rowData: record, showModal })}
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
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Fragment>
  );
}
