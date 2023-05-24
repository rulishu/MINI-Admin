import AModal from '@/components/AModal';
import SelectUser from '@/components/selectUser';
import { create, updateInfo } from '@/service/agent/agentManagement';
import { ProCard } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';

export default () => {
  const form = useForm();
  const {
    agentManagement: { visible, queryInfo, type },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'agentManagement/update',
      payload: data,
    });
  };

  const fn = {
    add: create,
    edit: updateInfo,
  };

  // eslint-disable-next-line no-unused-vars
  const { mutateAsync, isLoading } = useReactMutation({
    mutationFn: fn[type],
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        update({
          visible: false,
          reload: true,
          type: '',
          queryInfo: {},
          relaod: true,
        });
      }
    },
  });

  useEffect(() => {
    if (visible) {
      form.setValues({
        level: queryInfo.level,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, queryInfo]);

  // eslint-disable-next-line
  const onFinish = (values) => {
    const params = {
      id: queryInfo.id,
    };
    mutateAsync(params);
  };

  return (
    <AModal
      open={visible}
      width={600}
      onCancel={() => update({ visible: false })}
      footer={
        <div style={{ paddingBottom: 24, paddingRight: 24 }}>
          <Button key="save" type="primary" loading={isLoading} onClick={form.submit}>
            保存
          </Button>
          <Button key="cancel" onClick={() => update({ visible: false })}>
            取消
          </Button>
        </div>
      }
    >
      <ProCard
        title={type === 'add' ? '新增' : '修改'}
        headerBordered
        bodyStyle={{ paddingBottom: 0 }}
      >
        <FormRender
          form={form}
          widgets={{
            selectUser: SelectUser,
          }}
          schema={{
            type: 'object',
            properties: {
              form1: {
                type: 'object',
                widget: 'lineTitle',
                title: '代理',
                properties: {
                  companyName: {
                    title: '代理商名称',
                    type: 'string',
                    required: true,
                    span: 12,
                    props: {
                      allowClear: true,
                    },
                    placeholder: '请输入代理商',
                  },
                  companyName2: {
                    title: '镖局名称',
                    type: 'string',
                    required: true,
                    span: 12,
                    props: {
                      allowClear: true,
                    },
                    placeholder: '请输入代理商',
                  },
                  remark: {
                    title: '备注',
                    type: 'string',
                    widget: 'textArea',
                    span: 24,
                    props: {
                      allowClear: true,
                      rows: 4,
                    },
                    placeholder: '请输入代理商',
                  },
                },
              },
              form2: {
                type: 'object',
                widget: 'lineTitle',
                title: '代理人账号',
                properties: {
                  productId: {
                    title: '代理人账号',
                    tooltip: '代理人账号可以查看代理公司归属地盘的地盘分润',
                    type: 'object',
                    widget: 'selectUser',
                    required: true,
                    props: {
                      api: '/jcgl-user/admin/user/select/list',
                    },
                  },
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
