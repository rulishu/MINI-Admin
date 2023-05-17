import { deleteItem, selectById, selectPage } from '@/service/goods/supplier';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal } from 'antd';
import { useEffect, useRef } from 'react';
import Details from './Details';
import { columns } from './columns';

export default () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const { reload, userList } = useSelector((state) => state.supplier);
  const update = (data) => {
    dispatch({
      type: 'supplier/update',
      payload: data,
    });
  };

  // 新增编辑刷新分页
  useEffect(() => {
    if (reload) ref?.current?.reload();
  }, [reload]);

  useEffect(() => {
    dispatch({ type: 'supplier/getTreeList' });
  }, []);

  // 详情接口
  const { mutateAsync } = useReactMutation({
    mutationFn: selectById,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        update({
          visible: true,
          queryInfo: result,
        });
      }
    },
  });

  // 删除接口
  const { mutateAsync: mutateDeleteAsync } = useReactMutation({
    mutationFn: deleteItem,
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        ref?.current?.reload();
      }
    },
  });

  // 操作
  const handleEdit = (type, record) => {
    update({ type });
    if (type === 'add') {
      update({ visible: true, queryInfo: {} });
    }
    if (type === 'edit') {
      mutateAsync({ id: record.supplierId });
    }
    if (type === 'delete') {
      Modal.confirm({
        title: '确定是否删除',
        onOk: () => mutateDeleteAsync({ id: record.supplierId }),
      });
    }
  };
  return (
    <div>
      <ProTable
        actionRef={ref}
        options={false}
        search={{
          labelWidth: 120,
        }}
        request={async (params = {}) => {
          const { current, pageSize, ...formData } = params;
          let body = {
            ...formData,
            pageNum: current,
            pageSize,
          };
          const { code, result } = await selectPage(body);
          if (code && code === 200) {
            update({ reload: false });
            return {
              data: result.records || [],
              total: result.total,
              success: true,
            };
          }
        }}
        toolbar={{
          actions: (
            <ButtonGroupPro
              button={[
                {
                  label: '新增供应商',
                  type: 'primary',
                  onClick: () => handleEdit('add'),
                },
              ]}
            />
          ),
        }}
        pagination={{
          showSizeChanger: true,
        }}
        cardBordered={true}
        columns={columns({
          handleEdit,
          productSelector: {
            onFocus: () => {
              dispatch({
                type: 'supplier/getUserList',
                payload: {},
              });
            },
            onSearch: (value) => {
              dispatch({
                type: 'supplier/getUserList',
                payload: { userName: value },
              });
            },
            options: userList.map((item) => ({
              label: `${item.userName}-${item.mobile}`,
              value: item.userId,
            })),
          },
        })}
        rowKey="supplierId"
        scroll={{ x: 1300 }}
      />
      <Details />
    </div>
  );
};
