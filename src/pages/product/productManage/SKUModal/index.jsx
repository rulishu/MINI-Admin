import GoodsSKU from '@/components/sku';
import SKUList from '@/components/sku/SKUList';
import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal, message } from 'antd';
import { cloneElement, useEffect, useState } from 'react';

const SKUModal = (props) => {
  const { value, onChange } = props;

  const { editType, queryInfo, itemSkuVos, attrOptions, showSKU } = useSelector(
    (state) => state.productManage,
  );
  const dispatch = useDispatch();

  const [toSku, setToSku] = useState([]);
  const [tableSource, setTableSource] = useState([]);

  useEffect(() => {
    setTableSource(skuArrInTable());
    setToSku(attrParams(itemSkuVos, attrOptions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSkuVos]);

  const onFinish = (list = []) => {
    console.log('list: ', list, value);
    if (list?.length > 0) {
      if (editType === 'edit') {
        dispatch({
          type: 'productManage/updateSKU',
          payload: {
            itemId: queryInfo.id,
            list: list.map((item) => ({
              skuId: item?.skuId,
              price: item?.price,
              sales: item?.sales,
              stock: item?.stock,
              attributes: item?.attributes,
              itemId: queryInfo.id,
            })),
          },
        });
      }

      dispatch({
        type: 'productManage/update',
        payload: {
          itemSkuVos: list,
          showSKU: false,
        },
      });
      onChange(list);
    } else {
      message.warning('请先添加规格');
    }
  };
  // const list = itemSkuVos.map((item) => ({ ...item, attributes: { ...item?.attributes } }));

  const getSKU = (val) => {
    //
    if (val?.length > 0) {
      setToSku(val);
      setTableSource([]);
    } else {
      message.warning('请先添加规格');
    }
  };

  const skuArrInTable = () => {
    return itemSkuVos.map((theSKU) => {
      if (theSKU?.attributes) {
        let obj = {};
        let attributesObj = {};
        theSKU?.attributes.forEach((theAttr) => {
          const name = attrOptions.find(
            (item) => item?.id === String(theAttr?.attributeId),
          )?.attributeName;
          if (name) {
            obj[name] = theAttr.value;
            attributesObj[name] = { ...theAttr, attribute_name: name };
          }
        });
        return { ...theSKU, ...obj, attributes: attributesObj };
      } else {
        return theSKU;
      }
    });
  };

  return (
    <Modal
      open={showSKU}
      // destroyOnClose
      modalRender={(comps) => {
        return cloneElement(comps, {
          ...comps.props,
          style: {
            padding: 0,
          },
        });
      }}
      onOk={() => {}}
      width={1200}
      footer={null}
      onCancel={() => {
        dispatch({
          type: 'productManage/update',
          payload: { showSKU: false },
        });
      }}
    >
      <ProCard title="商品规格" headerBordered bodyStyle={{}}>
        <GoodsSKU
          attrValue={attrParams(itemSkuVos, attrOptions)}
          onChange={getSKU}
          options={
            [
              { label: '酒精度', value: 1 },
              { label: '容量', value: 2 },
              { label: '甜度', value: 3 },
            ]
            // attrOptions.map((item) => ({ label: item?.attributeName, value: item?.id }))
          }
        />
        <div style={{ marginTop: 20 }}>
          <SKUList data={toSku} onChange={onFinish} editData={tableSource} />
        </div>
      </ProCard>
    </Modal>
  );
};
export default SKUModal;

const attrParams = (itemSkuVos, attrOptions) => {
  let attrLists = [];
  itemSkuVos.forEach((item) => {
    if (item?.attributes) {
      attrLists = attrLists.concat(item?.attributes);
    }
  });
  //
  let arr = [];
  attrLists.map((item) => {
    const idx = arr.findIndex((i) => i?.attribute_value === item?.attributeId);
    if (idx > -1) {
      if (arr[idx].valueList.findIndex((attrdata) => attrdata === item?.value) === -1) {
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
