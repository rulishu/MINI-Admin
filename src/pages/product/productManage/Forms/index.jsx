import { useModel } from '@umijs/max';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import item from './item';

const Index = () => {
  const form = useForm();
  const {
    store: { select },
    update,
  } = useModel('productManage', (model) => ({ ...model }));
  console.log(select);
  const onFinish = (formData) => {
    console.log('formData:', formData);
  };

  return (
    <div>
      <FormRender
        form={form}
        schema={item}
        footer={() => (
          <>
            <Button onClick={() => update({ showForm: false })}>取消</Button>
            <Button type="primary" onClick={form.submit}>
              保存并查看
            </Button>
          </>
        )}
        onFinish={onFinish}
      />
    </div>
  );
};
export default Index;
