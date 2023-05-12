import { added, deleteProduct, details, selectSellPage, takeDown } from '@/service/productManage';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useReactMutation } from '@antdp/hooks';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useRef } from 'react';
import { columns } from './columns';

export default function Tables() {
  const ref = useRef();

  const {
    store: { activeKey, tabs, select, reload },
    update,
  } = useModel('productManage', (model) => ({ ...model }));

  useEffect(() => {
    if (reload) {
      ref?.current?.reload();
    }
  }, [reload]);

  /** 上架/下架/删除  */
  const { mutateAsync: uploadAsync, isLoading: uploadLoading } = useReactMutation({
    mutationFn: added,
    onSuccess: ({ code }) => {
      if (code === 200) {
        ref?.current?.reload();
      }
    },
  });

  // 下架
  const { mutateAsync: downAsync, isLoading: downLoading } = useReactMutation({
    mutationFn: takeDown,
    onSuccess: ({ code }) => {
      if (code === 200) {
        ref?.current?.reload();
      }
    },
  });

  // 上传
  const { mutateAsync: deleteAsync, isLoading: delteLoading } = useReactMutation({
    mutationFn: deleteProduct,
    onSuccess: ({ code }) => {
      if (code === 200) {
        ref?.current?.reload();
      }
    },
  });

  // 详情
  const { mutateAsync: selectById } = useReactMutation({
    mutationFn: details,
    contentType: 'form',
    method: 'GET',
    onSuccess: ({ code, result }) => {
      if (code === 200) {
        update({ showForm: true, queryInfo: result });
      }
    },
  });

  const handleEdit = (type, record) => {
    const { selectedRowKeys } = select;
    // 新增
    if (type === 'add') {
      update({ type: type, showForm: true, queryInfo: { categoryId: String(tabs) } });
    }
    // 编辑
    if (type === 'edit' || type == 'view') {
      update({ type: type });
      selectById({ id: record.id });
    }
    // 上架/下架/删除
    if (type === 'upload' || type === 'down' || type == 'delete') {
      if (selectedRowKeys.length !== 0) {
        if (type === 'upload') uploadAsync(selectedRowKeys);
        if (type === 'down') downAsync({ ids: selectedRowKeys });
        if (type === 'delete') deleteAsync(selectedRowKeys);
      } else {
        message.warning('请勾选商品');
      }
    }
  };

  return (
    <ProTable
      actionRef={ref}
      options={false}
      request={async (params = {}) => {
        const { current, pageSize, ...formData } = params;
        let status = {};
        if (activeKey === '1') {
          status = { onShelf: 2 };
        }
        // 已售空
        if (activeKey === '2') {
          status = { stock: 0 };
        }
        // 未上架
        if (activeKey === '3') {
          status = { onShelf: 0 };
        }
        let body = {
          pageNum: current,
          pageSize,
          categoryId: tabs,
          ...status,
          ...formData,
        };
        const { code, result } = await selectSellPage(body);
        if (code === 200) {
          update({ select: { selectedRowKeys: [], selectedRows: [], reload: false } });
          return {
            data: result.records || [],
            total: result.total,
            success: true,
          };
        }
      }}
      toolbar={{
        menu: {
          type: 'tab',
          activeKey: activeKey,
          items: [
            {
              key: '1',
              label: `销售中`,
            },
            {
              key: '2',
              label: `已售空`,
            },
            {
              key: '3',
              label: `未上架`,
            },
          ],
          onChange: (key) => {
            update({ activeKey: key });
            ref?.current?.reload();
          },
        },
        actions: (
          <ButtonGroupPro
            button={[
              {
                type: 'primary',
                label: '发布商品',
                onClick: () => handleEdit('add'),
              },
              {
                type: 'primary',
                label: '上架',
                onClick: () => handleEdit('upload'),
                disabled: activeKey !== '3',
                loading: uploadLoading,
              },
              {
                type: 'primary',
                label: '下架',
                disabled: activeKey === '3' || activeKey === '2',
                onClick: () => handleEdit('down'),
                loading: downLoading,
              },

              {
                type: 'primary',
                label: '删除',
                onClick: () => handleEdit('delete'),
                loading: delteLoading,
              },
              {
                type: 'primary',
                label: '改分组',
              },
            ]}
          />
        ),
      }}
      pagination={{
        showSizeChanger: true,
      }}
      cardBordered={true}
      columns={columns({ handleEdit })}
      rowKey="id"
      rowSelection={{
        selectedRowKeys: select.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) =>
          update({ select: { selectedRowKeys: selectedRowKeys, selectedRows: selectedRows } }),
      }}
      scroll={{ x: 1300 }}
    />
  );
}
