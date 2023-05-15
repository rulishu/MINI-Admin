import { ButtonGroupPro } from '@antdp/antdp-ui';
import { Cascader, Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';
import { connect } from 'umi';

const EditForm = (props) => {
  const { dispatch, groupManage, loading, actionRef } = props;
  const { addOpen, categoryList, drawerParams, drawerType } = groupManage;

  const form = useForm();

  useEffect(() => {
    console.log('drawerParams: ', drawerParams);
    if (drawerType === 'edit') {
      form.setValues({ ...drawerParams });
    }
  }, [drawerParams, drawerType]);

  const update = (data) => {
    dispatch({
      type: 'groupManage/updateState',
      payload: data,
    });
  };

  const handler = (data) => {
    return data.map((item) => {
      let arr = [];
      const obj = { label: item?.categoryName || '', value: item?.id };
      if (item?.children && item?.children.length > 0) {
        arr = arr.push(handler(item.children));
        obj.children = arr;
      }
      return obj;
    });
  };

  const options = () => {
    if (categoryList.length > 0) {
      return [{ label: '一级类目', value: '0' }, ...handler(categoryList)];
    } else {
      return [];
    }
  };

  const schema = {
    type: 'object',
    properties: {
      parentId: {
        title: '上级类目',
        type: 'object',
        widget: 'cascader',
        required: true,
        props: {
          expandTrigger: 'hover',
          options: options(),
          changeOnSelect: true,
        },
      },
      categoryName: {
        title: '分组名称',
        type: 'string',
        required: true,
        props: {},
      },
      status: {
        title: '是否显示',
        required: true,
        type: 'number',
        widget: 'radio',
        props: {
          options: [
            { label: '是', value: 1 },
            { label: '否', value: 0 },
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
    let searchParams = {
      ...data,
      parentId: data?.parentId?.slice(-1)?.[0],
    };
    // parentId:
    if (drawerType === 'edit') {
      dispatch({
        type: 'groupManage/updateCategory',
        payload: { searchParams, actionRef },
      });
    }
    if (drawerType === 'add') {
      dispatch({
        type: 'groupManage/addCategory',
        payload: { searchParams, actionRef },
      });
    }
  };

  return (
    <Modal
      title="分组信息"
      open={addOpen}
      destroyOnClose
      onCancel={() => {
        form.resetFields();
        update({ addOpen: false });
      }}
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
