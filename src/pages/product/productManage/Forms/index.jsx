import GoodsSKU from '@/components/sku';
import { useMemo } from 'react';

const Index = () => {
  const options = useMemo(() => [
    { value: 1, label: '酒精度' },
    { value: 2, label: '容量' },
  ]);

  const onChange = (value) => {
    console.log(JSON.stringify(value));
  };

  return (
    <div>
      <GoodsSKU onChange={onChange} options={options} />
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
