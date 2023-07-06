import AModal from '@/components/AModal';
import { selectSellPage, selectSKU } from '@/service/goods/productManage';
import { BetaSchemaForm, ProCard } from '@ant-design/pro-components';
import { useRequest, useSetState } from 'ahooks';
import { Button, Table } from 'antd';
import _ from 'lodash';
import { useContext, useEffect } from 'react';
import { searchColumns } from './columns';
import { Context } from './hooks/context';

export default () => {
  const {
    state: { dataSource: data, visible },
    dispatch,
    onChange,
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
    onSuccess: async ({ code, result }) => {
      if (code && code === 200) {
        const datas = await Promise.all(
          (result.records || []).map(async (item) => {
            let name = [];
            const { result: res, code } = await selectSKU({ id: item.id });
            if (code === 200) {
              // 商品sku拼接
              res.forEach((value) => {
                if (value.attributes) {
                  const attrStr = value.attributes
                    .map((attr) => `${attr.value}${attr.attributeName}`)
                    .join('*');
                  name.push(attrStr);
                }
              });
            }
            return {
              ...item,
              skuName: name && name.join('/'),
              // 处理每个sku的attributes
              sku: (res || []).map((item) => {
                const attrStr = item.attributes
                  .map((attr) => `${attr.value}${attr.attributeName}`)
                  .join('*');
                return {
                  ...item,
                  attributes: attrStr,
                };
              }),
            };
          }),
        );
        setState({
          dataSource: datas || [],
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
        hasActivityRule: true,
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
      getCheckboxProps: (record) => ({
        disabled: record.isActivityItem,
      }),
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
    onChange?.(selectedStudent);
    dispatch({ dataSource: [...selectedStudent] });
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
