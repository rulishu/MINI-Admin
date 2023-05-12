import PriceName from '@/components/sku';

const Index = () => {
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
