import { getCategory } from '@/service/goods/groupManage';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import { useEffect, useRef } from 'react';
import { connect } from 'umi';
import EditForm from './EditForm';
import { columns } from './columns';

const SearchTable = (props) => {
  const { dispatch, groupManage } = props;
  const { pageSize, categoryList } = groupManage;
  const actionRef = useRef();

  useEffect(() => {
    dispatch({
      type: 'groupManage/getAllCategory',
    });
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
        drawerParams: {},
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
      Modal.confirm({
        title: '确定是否删除',
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
        options={false}
        request={async (params = {}, sort, filter) => {
          console.log(sort, filter);
          const { current, pageSize } = params;
          console.log('params: ', params);

          const { code, result } = await getCategory({
            page: current,
            pageSize,
            categoryName: params?.categoryName?.label,
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
          console.log('tableData: ', tableData);
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
            onClick={() => {
              // actionRef.current?.reload();
              handleEdit('add');
            }}
            type="primary"
          >
            新增分组
          </Button>
        )}
      />
      <EditForm actionRef={actionRef} />
    </>
  );
};

export default connect(({ groupManage }) => {
  return {
    groupManage,
  };
})(SearchTable);
