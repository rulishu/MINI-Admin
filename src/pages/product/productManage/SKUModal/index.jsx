import GoodsSKU from '@/components/sku';
import SKUList from '@/components/sku/SKUList';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Card } from 'antd';
import { useMemo, useState } from 'react';

const Index = () => {
  const { SKUtype, queryInfo, skuList } = useSelector((state) => state.productManage);
  console.log('skuList: ', skuList);
  const dispatch = useDispatch();

  const options = useMemo(() => [
    { value: 1, label: '酒精度' },
    { value: 2, label: '容量' },
  ]);

  const [sku, setSku] = useState([]);

  // useEffect(() => {
  //   dispatch({
  //     type: 'productManage/selectAttr',
  //   });
  // }, []);

  console.log('sku: ', sku);
  const [spectList, setSpectList] = useState([]);
  console.log('spectList: ', spectList);

  const onChange = (value, list) => {
    console.log(value, list);
    setSku(value);
  };

  const saveSpect = (spect) => {
    console.log('【 spect 】==>', spect);
    setSpectList(spect);
    if (SKUtype === 'add') {
      dispatch({
        type: 'productManage/createSKU',
        payload: spect.map((item) => ({ ...item, itemId: queryInfo.id })),
      });
    }
    if (SKUtype === 'edit') {
      dispatch({
        type: 'productManage/updateSKU',
        payload: spect.map((item) => ({ ...item, itemId: queryInfo.id })),
      });
    }
  };

  return (
    <Card>
      <Card>
        <GoodsSKU onChange={onChange} options={options} />
      </Card>
      <Card style={{ marginTop: 20 }}>
        <SKUList data={sku} onChange={saveSpect} />
      </Card>
      <Button
        style={{ margin: 24 }}
        onClick={() => {
          dispatch({
            type: 'productManage/update',
            payload: { showSKU: false },
          });
        }}
      >
        取消
      </Button>
    </Card>
  );
};
export default Index;
