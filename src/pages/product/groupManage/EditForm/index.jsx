import { ButtonGroupPro } from '@antdp/antdp-ui';
import { Cascader, Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';
import { connect } from 'umi';

const EditForm = (props) => {
  const { dispatch, groupManage, loading, actionRef } = props;
  const { addOpen, drawerParams, drawerType, categoryTree } = groupManage;

  const form = useForm();

  useEffect(() => {
    if (drawerType === 'edit' || drawerType === 'addChildren') {
      let parr = (drawerParams?.parentArray?.split(',') || []).concat([]);
      let level = drawerParams?.level;

      if (drawerType === 'addChildren') {
        if (level === 1) {
          parr = [drawerParams?.id];
        }
        if (level === 2) {
          parr.push(drawerParams?.id);
        }
        level = level + 1;
        form.setValues({ ...drawerParams, parr, level, categoryName: '' });

        return;
      }
      form.setValues({ ...drawerParams, parr, level });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerParams, drawerType]);

  const update = (data) => {
    dispatch({
      type: 'groupManage/updateState',
      payload: data,
    });
  };

  const handler = (data) => {
    return data.map((item) => {
      const obj = { label: item?.label || '', value: item?.id };
      if (item?.children && item?.children.length > 0) {
        obj.children = handler(item.children);
      }
      return obj;
    });
  };

  const options = () => {
    if (categoryTree.length > 0) {
      return [...handler(categoryTree)];
    } else {
      return [];
    }
  };

  const schema = {
    type: 'object',
    properties: {
      categoryName: {
        title: '类目名称',
        type: 'string',
        required: true,
        props: {},
      },
      parr: {
        title: '父类目',
        type: 'object',
        widget: 'cascader',
        required: true,
        disabled: true,
        defaultValue: ['0'],
        props: {
          // expandTrigger: 'hover',
          options: options(),
          // changeOnSelect: true,
        },
      },
      level: {
        title: '类目级别',
        type: 'number',
        required: true,
        enum: [1, 2, 3],
        enumNames: ['一级', '二级', '三级'],
        disabled: true,
        defaultValue: 1,
      },
      leafOrder: {
        title: '是否叶子类目',
        required: true,
        type: 'number',
        widget: 'radio',
        enum: [1, 2],
        enumNames: ['是', '否'],
        disabled: '{{ formData.level === 3 }}',
        defaultValue: 1,
      },
    },
  };

  const onFinish = (data) => {
    const { parr, ...others } = data;
    let searchParams = {
      ...others,
    };
    if (drawerType === 'edit') {
      dispatch({
        type: 'groupManage/updateCategory',
        payload: { searchParams, actionRef },
      });
    }
    if (drawerType === 'add') {
      searchParams.parentArray = parr.join();
      searchParams.parentId = '0';
      searchParams.status = 1;
      dispatch({
        type: 'groupManage/addCategory',
        payload: { searchParams, actionRef },
      });
    }
    if (drawerType === 'addChildren') {
      const { level, categoryName, leafOrder } = searchParams;
      dispatch({
        type: 'groupManage/addCategory',
        payload: {
          searchParams: {
            level,
            categoryName,
            leafOrder,
            parentArray: parr.join(),
            parentId: drawerParams?.id,
            status: 1,
          },
          actionRef,
        },
      });
    }
  };

  const watch = {
    level: (val) => {
      if (val === 3) {
        form.setFields([{ name: 'status', value: 'a' }]);
      }
    },
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
        watch={watch}
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
