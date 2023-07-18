import AModal from '@/components/AModal';
import { getUserList } from '@/service/cust/agentManagement';
import { edit } from '@/service/cust/userDetail';
import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';
import Users from './component/Users';
import { levelStatus } from './enum';

const title = {
  user: '修改邀请人',
  level: '修改经销等级',
};

export default ({ refresh }) => {
  const {
    userDetail: { editModalVisible, editType, editData },
  } = useSelector((state) => state);
  const form = useForm();
  const dispatch = useDispatch();
  const { modal } = App.useApp();

  const { run } = useRequest(edit, {
    manual: true,
    onSuccess: ({ code }) => {
      if (code === 200) {
        close();
        dispatch({
          type: 'userDetail/update',
          payload: {
            reload: true,
          },
        });
        refresh?.();
      }
    },
  });

  useEffect(() => {
    if (editModalVisible && editType === 'level') {
      form.setValues({
        levelName: editData.levelName,
      });
    }

    if (editModalVisible && editType === 'user') {
      form.setValues({
        invitationName: editData.invitationName,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editModalVisible]);

  const close = () => {
    dispatch({
      type: 'userDetail/update',
      payload: {
        editModalVisible: false,
        editType: '',
        editData: {},
      },
    });
  };

  const onFinish = (values) => {
    if (editType === 'level') {
      modal.confirm({
        title: '温馨提醒',
        maskClosable: true,
        content: `确定要修改吗？`,
        onOk: () => {
          run({ id: editData?.id, level: values?.level });
        },
      });
    } else {
      const value = {
        id: editData?.id,
        invitationCode: values?.consumerCode?.consumerCode, // 更改后的邀请码
        consumerCode: editData.consumerCode, // 当前自己的邀请码
      };
      modal.confirm({
        title: '温馨提醒',
        maskClosable: true,
        content: `确定要修改吗？`,
        onOk: () => {
          run(value);
        },
      });
    }
  };

  return (
    <AModal
      open={editModalVisible}
      width={500}
      onCancel={close}
      footer={
        <div style={{ paddingBottom: 24, paddingRight: 24 }}>
          <Button key="cancel" onClick={close}>
            取消
          </Button>
          <Button key="save" type="primary" onClick={form.submit}>
            确定
          </Button>
        </div>
      }
    >
      <ProCard title={title[editType]} headerBordered bodyStyle={{ paddingBottom: 0 }}>
        <FormRender
          maxWidth={500}
          labelWidth={100}
          form={form}
          widgets={{
            users: Users,
          }}
          schema={{
            type: 'object',
            displayType: 'row',
            properties: {
              // 经销等级
              levelName: {
                span: 24,
                type: 'string',
                title: '当前等级',
                widget: 'html',
                hidden: editType !== 'level',
              },
              level: {
                span: 24,
                title: '变更后',
                widget: 'select',
                type: 'number',
                required: true,
                placeholder: '请选择',
                props: {
                  options: Object.entries(levelStatus).map(([key, value]) => ({
                    label: value.text,
                    value: key,
                  })),
                  allowClear: true,
                },
                hidden: editType !== 'level',
              },
              // 邀请人
              invitationName: {
                span: 24,
                type: 'string',
                title: '当前邀请人',
                widget: 'html',
                hidden: editType !== 'user',
              },
              consumerCode: {
                title: '变更后',
                type: 'object',
                tooltip: '变更邀请人会迁移整个团队，请慎重操作',
                widget: 'users',
                required: true,
                hidden: editType !== 'user',
                width: 200,
                props: {
                  fetch: getUserList,
                  title: '邀请人',
                },
              },
            },
          }}
          onFinish={onFinish}
        />
      </ProCard>
    </AModal>
  );
};
