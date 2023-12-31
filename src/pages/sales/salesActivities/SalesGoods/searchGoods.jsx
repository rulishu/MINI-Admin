import AModal from '@/components/AModal';
import { selectSellPage } from '@/service/goods/productManage';
import { BetaSchemaForm, ProCard } from '@ant-design/pro-components';
import { useRequest, useSetState } from 'ahooks';
import { Button, Table } from 'antd';
import _ from 'lodash';
import { useEffect } from 'react';
import { searchColumns } from './columns';

export default (props) => {
  const { dataSource: data, setDataSource, visible, setVisible, onChange } = props;

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
        selectedStudent: [...data],
        selectedStudentKey: [...data].map((item) => item.id),
      });
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      run({
        pageNum,
        pageSize,
        ...searchForm,
      });
    }
  }, [pageNum, pageSize, searchForm, visible]);

  const orderTableProps = {
    rowSelection: {
      selectedRowKeys: selectedStudentKey,
      onSelect: (record, selected) => {
        if (selectedStudentKey.length >= 100) {
          return;
        }
        const newSelectedRows = _.cloneDeep(selectedStudent);
        if (selected) newSelectedRows.push(record);
        if (!selected) _.remove(newSelectedRows, (item) => item.id === record.id);
        const selectedRowKeys = _.map(newSelectedRows, 'id');
        setState({ selectedStudent: newSelectedRows, selectedStudentKey: selectedRowKeys });
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        if (selectedStudentKey.length >= 100) {
          return;
        }
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
    setVisible(false);
  };

  const save = () => {
    setDataSource([...selectedStudent]);
    onChange?.(selectedStudent);
    close();
  };

  return (
    <AModal
      open={visible}
      width={1000}
      onCancel={close}
      footer={
        <div
          style={{
            paddingBottom: 24,
            paddingRight: 24,
            paddingLeft: 24,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>
            已选 <span style={{ color: '#1677ff' }}>{selectedStudentKey.length}</span> 条（上限100）
          </span>
          <div>
            <Button key="save" type="primary" onClick={save}>
              保存
            </Button>
            <Button key="cancel" onClick={close}>
              取消
            </Button>
          </div>
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
