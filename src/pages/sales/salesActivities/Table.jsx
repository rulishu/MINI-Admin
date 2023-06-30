import { selectPage } from '@/service/sales/coupon';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { ModalForm, ProFormRadio, ProTable } from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';
import { Button, Modal } from 'antd';
import { Fragment, useRef, useState } from 'react';
import ModalEditForm from './ModalEditForm';
import { columns } from './columns';
const { confirm } = Modal;

export default function SearchTable() {
  const dispatch = useDispatch();
  const [modalVisit, setModalVisit] = useState(false);
  const [theOne, setTheOne] = useState({});

  const actionRef = useRef();

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
      setTheOne(record);
      setModalVisit(true);
    }
    if (type === 'delete') {
      confirm({
        title: '删除后将不可恢复，是否删除?',
        icon: <ExclamationCircleFilled />,
        okText: '确定',
        cancelText: '取消',
        onOk() {
          dispatch({
            type: 'salesActivities/deleteCoupon',
            payload: {
              ...record,
              callback: () => {
                actionRef?.current?.reload();
              },
            },
          });
        },
        onCancel() {},
      });
    }
  };

  return (
    <Fragment>
      <ProTable
        actionRef={actionRef}
        headerTitle="优惠卷列表"
        options={false}
        request={async (params = {}) => {
          console.log('params: ', params);
          const { current, createTime, ...others } = params;
          const obj = {
            pageNum: current,
            ...others,
          };
          if (createTime && createTime?.length === 2) {
            obj.createTimeStart = createTime?.[0] + ' 00:00:00';
            obj.createTimeEnd = createTime?.[1] + ' 23:59:59';
          }
          const { code, result } = await selectPage(obj);
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
      <ModalEditForm actionRef={actionRef} />
      <ModalForm
        title="失效后活动将结束"
        open={modalVisit}
        onFinish={async (value) => {
          let conne = false;
          await dispatch({
            type: 'salesActivities/updateCouponStatus',
            payload: {
              id: theOne?.id,
              ...value,
              callback: () => {
                actionRef?.current?.reload();
                conne = true;
              },
            },
          });
          return conne;
        }}
        submitter={{
          searchConfig: {
            submitText: '确认',
            resetText: '取消',
          },
        }}
        onOpenChange={(op) => {
          setModalVisit(op);
          if (!op) {
            setTheOne({});
          }
        }}
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
          initialValue={0}
          name="type"
          label="是否同时失效已领取未使用的优惠卷"
          options={[
            {
              label: '是',
              value: 0,
            },
            {
              label: '否',
              value: 1,
            },
          ]}
        />
      </ModalForm>
    </Fragment>
  );
}
