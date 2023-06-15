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
    console.log('drawerParams, drawerType: ', drawerParams, drawerType);
    if (drawerType === 'edit' || drawerType === 'addChildren') {
      let parr = (drawerParams?.parentArray?.split(',') || []).concat([]);
      let level = drawerParams?.level;
      let leafOrder = drawerParams?.leafOrder || 1;
      if (drawerType === 'addChildren') {
        if (level === 1) {
          parr = [drawerParams?.id];
        }
        if (level === 2) {
          parr.push(drawerParams?.id);
          leafOrder = 1;
        }
        level = level + 1;
        form.setValues({ ...drawerParams, parr, level, categoryName: '', leafOrder });

        return;
      }
      form.setValues({ leafOrder: 1, ...drawerParams, parr, level });
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
    const arr = [];
    data.forEach((item) => {
      if (item?.leafOrder !== 1) {
        const obj = { label: item?.label || '', value: item?.id };
        if (item?.children && item?.children.length > 0) {
          obj.children = handler(item.children);
        }
        arr.push(obj);
      }
    });
    return arr;
  };

  const options = () => {
    if (categoryTree.length > 0) {
      const newArr = [];
      handler(categoryTree).forEach((item) => {
        if (item?.value !== '0') {
          newArr.push(item);
        }
      });
      return newArr;
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
        disabled: drawerType === 'add' ? false : true,
        defaultValue: ['0'],
        props: {
          expandTrigger: 'hover',
          options: options(),
          changeOnSelect: true,
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
      const arr = parr.concat([]);
      searchParams.parentArray = parr.join();
      searchParams.parentId = parr.join() === '0' ? '0' : arr?.splice(-1)?.[0];
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
    parr: (val) => {
      console.log('val: ', val);
      if (val) {
        if (val.length === 1 && val[0] === '0') {
          form.setFields([{ name: 'level', value: 1 }]);
        } else if (val.length > 0) {
          form.setFields([{ name: 'level', value: val.length + 1 }]);
        }
      }
    },
    level: (val) => {
      if (val === 3) {
        form.setFields([{ name: 'status', value: 1 }]);
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
        update({ addOpen: false, drawerParams: {}, drawerType: '' });
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
