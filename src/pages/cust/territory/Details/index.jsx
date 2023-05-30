import AModal from '@/components/AModal';
import { create, updateInfo } from '@/service/cust/territory';
import { ProCard } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Cascader } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';
import { levelEnum } from '../enum';

function findPath(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item.areaId === value) {
      return [value];
    }
    if (item.children) {
      const path = findPath(item.children, value);
      if (path) {
        return [item.areaId, ...path];
      }
    }
  }
  return null;
}

export default () => {
  const form = useForm();
  const {
    territory: { visible, queryInfo, type, companyList, areaList },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'territory/update',
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
        });
      }
    },
  });

  useEffect(() => {
    if (visible) {
      // 获取areaId和他父级集合
      let areaIds = findPath(areaList, queryInfo.areaId) || [];
      form.setValues({
        level: queryInfo.level,
        agentCompanyId: queryInfo.id
          ? { label: queryInfo.companyName, value: queryInfo.id }
          : undefined,
        areaId: areaIds,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, queryInfo]);

  const onFinish = (values) => {
    const params = {
      vo: [
        {
          agentCompanyId: values.agentCompanyId && values.agentCompanyId.value,
          areaId:
            values.areaId && values.areaId.length > 0 && values.areaId[values.areaId.length - 1],
          level: values.level,
          id: queryInfo.id,
        },
      ],
      agentCompanyId: values.agentCompanyId && values.agentCompanyId.value,
    };
    mutateAsync(params);
  };

  const watch = {
    level: (value) => {
      form.setValues({ areaId: '' });
      dispatch({
        type: 'territory/selectByAgentArea',
        payload: {
          level: value,
        },
      });
    },
  };

  return (
    <AModal
      open={visible}
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
          watch={watch}
          widgets={{ cascader: Cascader }}
          schema={{
            type: 'object',
            column: 2,
            properties: {
              agentCompanyId: {
                title: '代理商',
                type: 'object',
                widget: 'select',
                required: true,
                disabled: type === 'edit',
                props: {
                  onFocus: () => dispatch({ type: 'territory/selectByAgentCompany' }),
                  labelInValue: true,
                  options: companyList,
                  filterOption: (input, option) => (option?.label ?? '').includes(input),
                  showSearch: true,
                  allowClear: true,
                },
                placeholder: '请选择代理商',
              },
              level: {
                title: '代理级别',
                type: 'number',
                widget: 'select',
                required: true,
                props: {
                  allowClear: true,
                  options: Object.keys(levelEnum).map((key) => ({
                    label: levelEnum[key].text,
                    value: parseInt(key),
                  })),
                },
                placeholder: '请选择代理级别',
              },
              areaId: {
                title: '代理地盘',
                type: 'sring',
                widget: 'cascader',
                required: true,
                props: {
                  options: areaList,
                  fieldNames: {
                    label: 'areaName',
                    value: 'areaId',
                    children: 'children',
                  },
                },
                disabled: '{{ !formData.level }}',
                placeholder: '请选择代代理地盘',
              },
            },
          }}
          onFinish={onFinish}
        />
      </ProCard>
    </AModal>
  );
};
