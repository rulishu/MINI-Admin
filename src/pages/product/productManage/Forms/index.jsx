import GoodsSKU from '@/components/sku';
import SKUList from '@/components/sku/SKUList';
import { Card } from 'antd';
import { useMemo, useState } from 'react';

const Index = () => {
  const options = useMemo(() => [
    { value: 1, label: '酒精度' },
    { value: 2, label: '容量' },
  ]);

  const [sku, setSku] = useState([]);
  const [spectList, setSpectList] = useState();

  const onChange = (value, list) => {
    console.log(value, list);
    setSku(value);
  };

  const saveSpect = (spect) => {
    console.log('【 spect 】==>', spect);
    setSpectList(spect);
  };

  return (
    <Card>
      <GoodsSKU onChange={onChange} options={options} />
      <SKUList data={sku} onChange={saveSpect} />
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
    </Card>
  );
};
export default Index;
