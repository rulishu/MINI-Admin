import { selectPage } from '@/service/tagsManage';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useReactMutation } from '@antdp/hooks';
import { useModel } from '@umijs/max';
import { Modal } from 'antd';
import { useRef, useState } from 'react';
import { columns } from './columns';

export default function SearchTable() {
  const ref = useRef();
  const [pageSize, setPageSize] = useState(10);
  const { store, setStore, setVisible } = useModel('tagsManage', (model) => ({ ...model }));

  const mutation = useReactMutation({
    url: '/api/selectById',
    onSuccess: ({ code, data }) => {
      if (code === 1) {
        setStore({
          ...store,
          queryInfo: data || {},
        });
        setVisible(true);
      }
    },
  });

  // eslint-disable-next-line no-unused-vars
  const handleEdit = async (type, record) => {
    if (type === 'edit') {
      await mutation.mutateAsync({ id: 1 });
      console.log('1111');
    } else {
      Modal.confirm({
        title: '确定是否删除',
        onOk: () => ref.current.reload(),
      });
    }
  };

  return (
    <ProTable
      actionRef={ref}
      options={false}
      request={async (params = {}) => {
        const { current, pageSize, ...formData } = params;
        const { code, data } = await selectPage({
          current,
          pageSize,
          queryData: { ...formData },
        });
        if (code === 1) {
          return {
            data: data.rows || [],
            total: data.total,
            success: true,
          };
        }
      }}
      toolbar={{
        menu: {
          type: 'tab',
          activeKey: store.activeKey,
          items: [
            {
              key: 'tab1',
              label: '手动标签',
            },
            {
              key: 'tab2',
              label: '自动标签',
            },
          ],
          onChange: (key) => {
            setStore({ ...store, activeKey: key });
            ref.current.reload();
          },
        },
        actions: (
          <ButtonGroupPro
            button={[
              {
                type: 'primary',
                label: store.activeKey === 'tab1' ? '添加手动标签' : '添加自动标签',
                onClick: () => {
                  setVisible(true);
                  setStore({
                    ...store,
                    queryInfo: {},
                  });
                },
              },
              {
                type: 'primary',
                label: '导出标签',
              },
            ]}
          />
        ),
      }}
      pagination={{
        pageSize: pageSize,
        onChange: (_, pageSize) => setPageSize(pageSize),
        showSizeChanger: true,
      }}
      cardBordered={true}
      columns={columns({ handleEdit })}
      rowKey="id"
    />
  );
}