import GoodsSKU from '@/components/sku';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Card } from 'antd';
import { useMemo } from 'react';

const Index = () => {
  const { SKUtype, queryInfo, skuList } = useSelector((state) => state.productManage);
  const dispatch = useDispatch();

  const options = useMemo(
    () => [
      { value: 1, label: '酒精度' },
      { value: 2, label: '容量' },
    ],
    [],
  );

  const onChange = (list = []) => {
    if (SKUtype === 'add') {
      dispatch({
        type: 'productManage/createSKU',
        payload: list.map((item) => ({ ...item, itemId: queryInfo.id })),
      });
    }
    if (SKUtype === 'edit') {
      dispatch({
        type: 'productManage/updateSKU',
        payload: list.map((item) => ({ ...item, itemId: queryInfo.id })),
      });
    }
  };

  return (
    <Card>
      <Card>
        <GoodsSKU value={skuList} onChange={onChange} options={options} />
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
