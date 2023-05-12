import { ButtonGroupPro } from '@antdp/antdp-ui';
import { Cascader, Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { connect } from 'umi';

const EditForm = (props) => {
  const { dispatch, groupManage, loading } = props;
  const { addOpen } = groupManage;

  const form = useForm();

  const update = (data) => {
    dispatch({
      type: 'groupManage/updateState',
      payload: data,
    });
  };

  const schema = {
    type: 'object',
    properties: {
      location: {
        title: '上级分类',
        type: 'string',
        widget: 'cascader',
        required: true,
        props: {
          expandTrigger: 'hover',
          options: options,
          changeOnSelect: true,
        },
      },

      input: {
        title: '分组名称',
        type: 'string',
        required: true,
        props: {},
      },
      radio1: {
        title: '是否显示',
        required: true,
        type: 'string',
        widget: 'radio',
        props: {
          options: [
            { label: '是', value: 'a' },
            { label: '否', value: 'b' },
          ],
        },
      },
    },
  };

  // useEffect(() => {
  //   form.setValues({ input: drawerParams.input });
  // }, [addOpen, drawerParams]);

  const onFinish = (data) => {
    console.log('data', data);
  };

  return (
    <Modal
      title="分组信息"
      open={addOpen}
      onCancel={() => update({ addOpen: false })}
      footer={
        <ButtonGroupPro
          button={[
            {
              type: 'primary',
              label: '确认',
              loading: loading,
              onClick: form.submit,
            },
            {
              type: 'primary',
              label: '取消',
              onClick: () => update({ addOpen: false }),
            },
          ]}
        />
      }
    >
      <FormRender
        widgets={{ cascader: Cascader }}
        form={form}
        schema={schema}
        onFinish={onFinish}
      />
    </Modal>
  );
};

export default connect(({ groupManage, loading }) => {
  return {
    groupManage,
    loading: loading.effects['groupManage/selectPage'],
  };
})(EditForm);

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hanzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
