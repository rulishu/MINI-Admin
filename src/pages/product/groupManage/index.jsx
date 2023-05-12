import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { history } from '@umijs/max';
import { Modal } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'umi';
import EditForm from './EditForm';
import { columns } from './columns';

const SearchTable = (props) => {
  const { dispatch, groupManage, loading } = props;
  const { pageSize } = groupManage;

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

  const selectPage = (pg, pgz) => {
    dispatch({
      type: 'groupManage/selectPage',
      payload: {
        page: pg,
        pageSize: pgz,
      },
    });
  };

  const handleEdit = (type) => {
    update({ type });
    if (type === 'add') {
      update({
        drawerParams: {},
        addOpen: true,
      });
    }
    if (type === 'edit') {
      update({
        drawerParams: { input: '测试编辑' },
        addOpen: true,
      });
    }
    if (type === 'manage') {
      history.push('/product/productManage');
    }
    if (type === 'delete') {
      Modal.confirm({
        title: '确定是否删除',
        onOk: () => {},
      });
    }
  };

  return (
    <React.Fragment>
      <ProTable
        loading={loading}
        options={false}
        request={async (params = {}) => {
          console.log('params: ', params);
          const { current, pageSize, ...formData } = params;
          update({ page: current, pageSize, searchParams: formData });
          selectPage(current, pageSize);
        }}
        pagination={{
          pageSize: pageSize,
          onChange: (_, pageSize) => update({ pageSize }),
          showSizeChanger: true,
        }}
        cardBordered
        columns={columns({ handleEdit })}
        rowKey="id"
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => (
          <ButtonGroupPro
            button={[
              {
                type: 'primary',
                label: '新增分组',
                onClick: () => handleEdit('add'),
              },
            ]}
          />
        )}
      />
      <EditForm />
    </React.Fragment>
  );
};

export default connect(({ groupManage, loading }) => {
  return {
    groupManage,
    loading: loading.effects['groupManage/selectPage'],
  };
})(SearchTable);
