import GoodsSKU from '@/components/sku';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Card } from 'antd';

const Index = () => {
  const { SKUtype, queryInfo, skuList, attrOptions } = useSelector((state) => state.productManage);
  const dispatch = useDispatch();

  const onChange = (list = []) => {
    console.log('list: ', list);
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
  const list = skuList.map((item) => ({ ...item, attributes: { ...item?.attributes } }));
  console.log('list: ', list);

  return (
    <Card>
      <Card>
        <GoodsSKU
          attrValue={attrParams(skuList, attrOptions)}
          value={list}
          onChange={onChange}
          options={attrOptions.map((item) => ({ label: item?.attributeName, value: item?.id }))}
        />
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

const attrParams = (skuList, attrOptions) => {
  let attrLists = [];
  skuList.forEach((item) => {
    if (item?.attributes) {
      attrLists = attrLists.concat(item?.attributes);
    }
  });
  //
  let arr = [];
  attrLists.map((item) => {
    const idx = arr.findIndex((i) => i?.attribute_value === item?.attributeId);
    if (idx > -1) {
      if (arr[idx].valueList.findIndex((attrdata) => attrdata !== item?.value)) {
        arr[idx].valueList = arr[idx].valueList.concat([item?.value]);
      }
    } else {
      arr.push({
        attribute_value: item?.attributeId,
        attribute_name: attrOptions.find((obj) => obj?.id === String(item?.attributeId))
          ?.attributeName,
        valueList: [item?.value],
      });
    }
  });
  return arr;
};
