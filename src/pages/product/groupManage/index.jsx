import { getCategory } from '@/service/goods/groupManage';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { App, Button } from 'antd';
import { useEffect, useRef } from 'react';
import { connect } from 'umi';
import EditForm from './EditForm';
import { columns } from './columns';
import './index.less';

const SearchTable = (props) => {
  const { dispatch, groupManage, loading } = props;
  const { pageSize, categoryList, addOpen } = groupManage;
  const { modal } = App.useApp();
  const actionRef = useRef();
  useEffect(() => {
    dispatch({
      type: 'groupManage/getCategoryTree',
    });
    dispatch({
      type: 'groupManage/getAllCategory',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (data) => {
    dispatch({
      type: 'groupManage/updateState',
      payload: data,
    });
  };

  const handleEdit = (type, data) => {
    update({ type });
    if (type === 'add') {
      update({
        drawerParams: { parentId: '0', level: 1 },
        drawerType: 'add',
        addOpen: true,
      });
    }
    if (type === 'edit') {
      update({
        drawerParams: data,
        drawerType: 'edit',
        addOpen: true,
      });
    }
    if (type === 'addChildren') {
      update({
        drawerParams: data,
        drawerType: 'addChildren',
        addOpen: true,
      });
    }
    if (type === 'delete') {
      modal.confirm({
        title: <span style={{ color: 'red' }}>删除有风险，操作需谨</span>,
        content: (
          <div>
            <p>删除类目会导致该类目下所有子类目全部被删除，并导致所有关联商品下架！</p>
            <p style={{ color: 'RGB(25,158,215)' }}>是否依旧删除？</p>
          </div>
        ),
        maskClosable: true,
        closable: true,
        cancelText: '取消',
        onCancel: () => {},
        autoFocusButton: null,
        okText: '确定删除',
        okType: 'primary',
        onOk: () => {
          dispatch({
            type: 'groupManage/deleteCategory',
            payload: { id: data?.id, actionRef },
          });
        },
      });
    }
  };
  return (
    <>
      <ProTable
        columns={columns({ handleEdit, categoryList })}
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

          const { code, result } = await getCategory({
            page: current,
            pageSize,
            categoryName: params?.categoryName,
            level: params?.level,
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
        headerTitle="商品类目"
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
            新增类目
          </Button>
        )}
      />
      {addOpen && <EditForm actionRef={actionRef} />}
    </>
  );
};

export default connect(({ groupManage, loading }) => {
  return {
    groupManage,
    loading,
  };
})(SearchTable);
