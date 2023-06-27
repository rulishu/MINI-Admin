import { selectPageList } from '@/service/order/shipping';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button } from 'antd';
import { useEffect, useRef } from 'react';
import EditForm from './EditForm';
import FormItemModal from './EditForm/FormItemModal';
import { columns } from './columns';
import './index.less';

const SearchTable = () => {
  const dispatch = useDispatch();
  const { shippingtemplates, loading } = useSelector((state) => state);
  const { pageSize } = shippingtemplates;

  const { modal } = App.useApp();
  const actionRef = useRef();

  useEffect(() => {
    dispatch({ type: 'commonInterface/getTreeList' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (data) => {
    dispatch({
      type: 'shippingtemplates/updateState',
      payload: data,
    });
  };

  const handleEdit = (type, data) => {
    update({ type });
    if (type === 'add') {
      update({
        drawerParams: {},
        drawerType: 'add',
        addOpen: true,
      });
    }
    if (type === 'edit') {
      update({
        drawerType: 'edit',
      });
      dispatch({
        type: 'shippingtemplates/getDetails',
        payload: data?.id,
      });
    }
    if (type === 'copy') {
      update({
        drawerType: 'copy',
      });
      dispatch({
        type: 'shippingtemplates/getDetails',
        payload: data?.id,
      });
    }
    if (type === 'delete') {
      modal.confirm({
        title: <span style={{ color: 'red' }}>确定要删除吗？</span>,
        maskClosable: true,
        closable: true,
        cancelText: '取消',
        onCancel: () => {},
        autoFocusButton: null,
        okText: '确定删除',
        okType: 'primary',
        onOk: () => {
          dispatch({
            type: 'shippingtemplates/deleteItem',
            payload: { id: data?.id, actionRef },
          });
        },
      });
    }
  };
  return (
    <>
      <ProTable
        columns={columns({ handleEdit })}
        actionRef={actionRef}
        cardBordered
        cardProps={{
          size: 'small',
          style: {
            padding: 0,
          },
        }}
        search={{
          labelWidth: 'auto',
          style: {
            padding: '24px 12px',
          },
        }}
        options={false}
        request={async (params = {}) => {
          const { current, pageSize } = params;

          const { code, result } = await selectPageList({
            page: current,
            pageSize,
            name: params?.name,
          });
          let tableData = [];
          if (code === 200 && result) {
            //
            tableData =
              result?.records.map((item) => {
                delete item?.children;
                return item;
              }) || [];
          }
          return { data: tableData, success: code === 200, total: result?.total || 0 };
        }}
        rowKey="id"
        pagination={{
          pageSize: pageSize,
          onChange: (_, pageSize) => update({ pageSize }),
          showSizeChanger: true,
        }}
        headerTitle="运费模板"
        toolBarRender={() => (
          <Button
            key="button"
            icon={<PlusOutlined />}
            loading={loading?.global}
            onClick={() => {
              // actionRef.current?.reload();
              handleEdit('add');
            }}
            type="primary"
          >
            新建模板
          </Button>
        )}
      />
      <EditForm actionRef={actionRef} />
      <FormItemModal />
    </>
  );
};

export default SearchTable;
