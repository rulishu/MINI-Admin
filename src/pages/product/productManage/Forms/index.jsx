import { useModel } from '@umijs/max';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import item from './item';

const Index = () => {
  const form = useForm();
  const { update } = useModel('productManage', (model) => ({ ...model }));

  const onFinish = () => {
    // console.log('Success:', values);
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
