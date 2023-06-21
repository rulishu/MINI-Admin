import AModal from '@/components/AModal';
import { selectSellPage } from '@/service/goods/productManage';
import { BetaSchemaForm, ProCard } from '@ant-design/pro-components';
import { useRequest, useSetState } from 'ahooks';
import { Button, Table } from 'antd';
import _ from 'lodash';
import { useContext, useEffect } from 'react';
import { searchColumns } from './columns';
import { Context } from './hooks/context';

export default () => {
  const {
    state: { value, visible },
    dispatch,
  } = useContext(Context);

  const [state, setState] = useSetState({
    searchForm: {},
    dataSource: [],
    pageNum: 1,
    pageSize: 10,
    total: 0,
    selectedStudent: [],
    selectedStudentKey: [],
  });

  const { dataSource, searchForm, pageNum, pageSize, total, selectedStudent, selectedStudentKey } =
    state;

  const { run, loading } = useRequest(selectSellPage, {
    manual: true,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        setState({
          dataSource: result.records || [],
          total: result.total,
        });
      }
    },
  });

  useEffect(() => {
    if (visible) {
      setState({
        selectedStudent: [...value],
        selectedStudentKey: [...value].map((item) => item.id),
      });
    }
  }, [visible]);

  useEffect(() => {
    run({
      pageNum,
      pageSize,
      ...searchForm,
    });
  }, [pageNum, pageSize, searchForm]);

  const orderTableProps = {
    className: 'wrap-table-align',
    rowSelection: {
      selectedRowKeys: selectedStudentKey,
      onSelect: (record, selected) => {
        const newSelectedRows = _.cloneDeep(selectedStudent);
        if (selected) newSelectedRows.push(record);
        if (!selected) _.remove(newSelectedRows, (item) => item.id === record.id);
        const selectedRowKeys = _.map(newSelectedRows, 'id');
        setState({ selectedStudent: newSelectedRows, selectedStudentKey: selectedRowKeys });
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        let newSelectedRows = _.cloneDeep(selectedStudent);
        const changeRowKeys = _.map(changeRows, 'id');
        if (selected) newSelectedRows = _.uniqBy(_.concat(newSelectedRows, changeRows), 'id');
        if (!selected) _.remove(newSelectedRows, (item) => _.includes(changeRowKeys, item.id));
        const selectedRowKeys = _.map(newSelectedRows, 'id');
        setState({
          selectedStudent: newSelectedRows,
          selectedStudentKey: selectedRowKeys,
        });
      },
    },
    pagination: {
      current: pageNum,
      pageSize,
      total,
      onChange: (page, pageSize) => {
        setState({ pageNum: page, pageSize: pageSize });
      },
      showTotal: (total) => `第 ${pageNum}-${dataSource.length} 条/总共 ${total} 条`,
    },
    bordered: true,
    dataSource,
    columns: searchColumns(),
    loading: loading,
    rowKey: 'id',
  };

  const reload = () => {
    setState({
      pageNum: 1,
      pageSize: 10,
      total: 0,
      searchForm: {},
    });
  };

  const close = () => {
    reload();
    dispatch({ visible: false });
  };

  const save = () => {
    reload();
    dispatch({ value: [...selectedStudent], visible: false });
  };

  return (
    <AModal
      open={visible}
      width={1000}
      onCancel={close}
      footer={
        <div style={{ paddingBottom: 24, paddingRight: 24 }}>
          <Button key="save" type="primary" onClick={save}>
            保存
          </Button>
          <Button key="cancel" onClick={close}>
            取消
          </Button>
        </div>
      }
    >
      <ProCard title="选择商品" headerBordered bodyStyle={{ paddingBottom: 0 }}>
        <BetaSchemaForm
          labelAlign="right"
          labelWidth={70}
          layoutType="QueryFilter"
          onFinish={(values) => {
            setState({ searchForm: values, pageNum: 1 });
          }}
          onReset={() => {
            setState({ searchForm: {}, pageNum: 1 });
          }}
          columns={[
            {
              title: '商品名称',
              dataIndex: 'itemName',
            },
            {
              title: '商品ID',
              dataIndex: 'id',
            },
          ]}
        />
        <Table {...orderTableProps} />
      </ProCard>
    </AModal>
  );
};
