// import { useModel } from '@umijs/max';
// import { Button } from 'antd';
// import FormRender, { useForm } from 'form-render';
// import item from './item';
// import { ButtonGroupPro } from '@antdp/antdp-ui'
import PriceName from '@/components/sku';

const Index = () => {
  // const form = useForm();
  // const { update } = useModel('productManage', (model) => ({ ...model }));

  // const onFinish = (values) => {
  //   console.log('values:', values);
  // };

  // const watch = {
  //   '#': (allValues, changedValues) => { // '#': () => {} 等同于 onValuesChange
  //     console.log('表单 allValues：', allValues);
  //     console.log('表单 changedValues：', changedValues);
  //   },
  //   'obj1.productSpecifications': (value = []) => {
  //     const result = value.reduce((acc, sku) => {
  //       sku.attributes.forEach(attr => {
  //         acc.push({ name: sku.skuName, value: attr.attributeName });
  //       });
  //       return acc;
  //     }, []);
  //     form.setValueByPath('obj1.details', result);
  //   },
  // };

  return (
    <div>
      <PriceName />
      {/* <FormRender
        form={form}
        schema={item}
        watch={watch}
        footer={() => (
          <ButtonGroupPro button={[
            {
              label: '取消',
              onClick: () => update({ showForm: false })
            },
            {
              label: '保存并查看',
              type: 'primary',
              onClick: form.submit
            },
          ]}
          />
        )}
        onFinish={onFinish}
      /> */}
    </div>
  );
};
export default Index;
