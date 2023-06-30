import AModal from '@/components/AModal';
import SelectUser from '@/components/SelectUser';
import { getUserList } from '@/service/cust/agentManagement';
import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';
import { levelStatus } from './enum';

const title = {
  user: '修改邀请人',
  level: '修改经销等级',
};

export default () => {
  const {
    userDetail: { editModalVisible, editType, editData },
  } = useSelector((state) => state);
  const form = useForm();
  const dispatch = useDispatch();
  const { message } = App.useApp();

  useEffect(() => {
    if (editModalVisible && editType === 'level') {
      form.setValues({
        levelName: editData.levelName,
      });
    }
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
    console.log('values', values);
    message.warning('功能还在开发中...');
    return;
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
          form={form}
          widgets={{
            selectUser: SelectUser,
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
              userName: {
                span: 24,
                type: 'string',
                title: '当前邀请人',
                widget: 'html',
                hidden: editType !== 'user',
              },
              legalPersonId: {
                title: '变更后',
                // tooltip: '变更邀请人会迁移整个团队，请慎重操作',
                type: 'object',
                widget: 'selectUser',
                required: true,
                hidden: editType !== 'user',
                props: {
                  fetch: getUserList,
                  configCode: {
                    key: 'id',
                    value: 'id',
                    label: 'consumerName',
                    headUrl: 'headUrl',
                    phone: 'consumerPhone',
                    searchCode: 'search',
                  },
                  title: '代理人',
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
