import { selectById, selectPage } from '@/service/cust/tagsManage';
import { ProTable } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button } from 'antd';
import React, { useRef, useState } from 'react';
import Edit from './Edit';
import { columns } from './columns';

export default function Page() {
  const ref = useRef();
  const { modal } = App.useApp();
  const [visible, setVisible] = useState(false);
  const { activeKey, queryInfo, type } = useSelector((state) => state.tagsManage);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'tagsManage/update',
      payload: data,
    });
  };
  const reload = ref?.current?.reload;

  /** 详情接口 */
  const { mutateAsync } = useReactMutation({
    url: selectById,
    onSuccess: ({ code, data }) => {
      if (code === 1) {
        update({
          queryInfo: data || {},
        });
        setVisible(true);
      }
    },
  });

  // eslint-disable-next-line no-unused-vars
  const handleEdit = async (type, record) => {
    if (type === 'edit') {
      update({ type });
      await mutateAsync({ id: 1 });
    } else {
      modal.confirm({
        title: '温馨提示',
        content: '确定是否删除',
        maskClosable: true,
        onOk: () => {
          ref.current.reload();
        },
      });
    }
  };

  return (
    <React.Fragment>
      <ProTable
        headerTitle="标签列表"
        actionRef={ref}
        options={false}
        search={{
          labelWidth: 'auto',
        }}
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
            activeKey: activeKey,
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
              update({ activeKey: key });
              ref?.current?.reload();
            },
          },
        }}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            onClick={() => {
              setVisible(true);
              update({
                queryInfo: {},
                type: 'add',
              });
            }}
          >
            {activeKey === 'tab1' ? '添加手动标签' : '添加自动标签'}
          </Button>,
          <Button key="add" type="primary">
            导出标签
          </Button>,
        ]}
        pagination={{
          showSizeChanger: true,
        }}
        cardBordered={true}
        columns={columns({ handleEdit })}
        rowKey="id"
      />
      <Edit
        visible={visible}
        setVisible={setVisible}
        queryInfo={queryInfo}
        type={type}
        reload={reload}
      />
    </React.Fragment>
  );
}
