import { selectPage, updateStatus } from '@/service/sales/flashKill';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button } from 'antd';
import { Fragment, useRef } from 'react';
import Edit from './Details/Edit';
import { columns } from './columns';

export default function SearchTable() {
  const {
    flashKill: { dataSource },
  } = useSelector((state) => state);
  const ref = useRef();
  const dispatch = useDispatch();
  const { modal } = App.useApp();

  const { run } = useRequest(updateStatus, { manual: true });
  const { run: runStatus } = useRequest(updateStatus, {
    manual: true,
    onSuccess: ({ code }) => {
      if (code === 200) {
        ref?.current?.reload?.();
      }
    },
  });

  const update = (data) => {
    dispatch({
      type: 'flashKill/update',
      payload: data,
    });
  };

  const handleEdit = (type, data) => {
    update({ type });
    if (type === 'add') {
      update({ visible: true, queryInfo: { appShow: 0 } });
    }
    if (type === 'editIsShow') {
      const value = data.appShow === 1 ? 0 : 1;
      run({
        id: data.id,
        appShow: value,
      });
      data.appShow = value;
      update({ dataSource });
    }
    if (type === 'lose') {
      modal.confirm({
        okText: '确认失效',
        title: '温馨提示',
        content: '失效后将不可恢复，是否失效',
        maskClosable: true,
        autoFocusButton: null,
        onOk: () => {
          runStatus({ status: -1, id: data.id });
        },
      });
    }
    if (type === 'delete') {
      modal.confirm({
        okText: '确认删除',
        title: '温馨提示',
        content: '删除后将不可恢复，是否删除',
        maskClosable: true,
        autoFocusButton: null,
        onOk: () => {},
      });
    }
  };

  return (
    <Fragment>
      <ProTable
        actionRef={ref}
        headerTitle="秒杀列表"
        options={false}
        request={async (params = {}) => {
          const { current, pageSize, ...formData } = params;
          const { code, result } = await selectPage({
            pageNum: current,
            pageSize,
            ...formData,
          });
          if (code && code === 200) {
            update({
              dataSource: result.records || [],
            });
            return {
              total: result.total,
              success: true,
            };
          }
        }}
        dataSource={dataSource}
        pagination={{
          showSizeChanger: true,
        }}
        cardBordered
        columns={columns({ handleEdit })}
        rowKey="id"
        search={{
          labelWidth: 80,
          labelAlign: 'right',
          span: 8,
          style: {
            padding: '12px 12px 12px 0px',
          },
        }}
        cardProps={{
          size: 'small',
          style: {
            padding: 0,
          },
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => handleEdit('add')}>
            新增
          </Button>,
        ]}
      />
      <Edit />
    </Fragment>
  );
}
