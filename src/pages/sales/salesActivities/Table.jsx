import { selectPage } from '@/service/sales/coupon';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { ModalForm, ProFormRadio, ProTable } from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';
import { Button, Modal, message } from 'antd';
import { Fragment, useState } from 'react';
import ModalEditForm from './ModalEditForm';
import { columns } from './columns';
const { confirm } = Modal;
export default function SearchTable() {
  const dispatch = useDispatch();
  const [modalVisit, setModalVisit] = useState(false);

  const update = (data) => {
    dispatch({
      type: 'salesActivities/update',
      payload: data,
    });
  };

  const handleEdit = (type, record) => {
    update({ type });
    if (type === 'add') {
      update({ visible: true });
    }
    if (type === 'edit') {
      dispatch({
        type: 'salesActivities/getDetails',
        payload: record?.id,
      });
    }
    if (type === 'lose') {
      setModalVisit(true);
    }
    if (type === 'delete') {
      confirm({
        title: '删除后将不可恢复，是否删除?',
        icon: <ExclamationCircleFilled />,
        onOk() {},
        onCancel() {},
      });
    }
  };

  return (
    <Fragment>
      <ProTable
        headerTitle="优惠卷列表"
        options={false}
        request={async (params = {}) => {
          const { current, pageSize, ...formData } = params;
          const { code, result } = await selectPage({
            pageNum: current,
            pageSize,
            ...formData,
          });
          if (code && code === 200) {
            return {
              data: result.records || [],
              total: result.total,
              success: true,
            };
          }
        }}
        pagination={{
          showSizeChanger: true,
        }}
        cardBordered
        columns={columns({ handleEdit })}
        rowKey="id"
        search={{
          labelWidth: 100,
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
            新建优惠卷
          </Button>,
        ]}
      />
      <ModalEditForm />
      <ModalForm
        title="失效后活动将结束"
        open={modalVisit}
        onFinish={async () => {
          message.success('提交成功');
          return true;
        }}
        onOpenChange={setModalVisit}
        labelCol={{ span: 13 }}
        wrapperCol={{ span: 8 }}
        layout="horizontal"
        modalProps={{
          destroyOnClose: true,
          width: 500,
          // centered: true,
        }}
      >
        <ProFormRadio.Group
          initialValue={1}
          name="radio-group"
          label="是否同时失效已领取未使用的优惠卷"
          options={[
            {
              label: '是',
              value: 1,
            },
            {
              label: '否',
              value: 2,
            },
          ]}
        />
      </ModalForm>
    </Fragment>
  );
}
