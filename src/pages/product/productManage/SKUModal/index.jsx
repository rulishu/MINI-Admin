import GoodsSKU from '@/components/sku';
import SKUList from '@/components/sku/SKUList';
import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal, message } from 'antd';
import { cloneElement, useEffect, useState } from 'react';

const SKUModal = () => {
  const { SKUtype, queryInfo, skuList, attrOptions, showSKU } = useSelector(
    (state) => state.productManage,
  );
  const dispatch = useDispatch();

  const [toSku, setToSku] = useState([]);
  const [tableSource, setTableSource] = useState([]);

  useEffect(() => {
    setTableSource(skuArrInTable());
    setToSku(attrParams(skuList, attrOptions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skuList]);

  const onChange = (list = []) => {
    if (list?.length > 0) {
      if (SKUtype === 'add') {
        dispatch({
          type: 'productManage/createSKU',
          payload: list.map((item) => ({
            price: item?.price,
            sales: item?.sales,
            stock: item?.stock,
            attributes: item?.attributes,
            itemId: queryInfo.id,
          })),
        });
      }
      if (SKUtype === 'edit') {
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
    } else {
      message.warning('请先添加规格');
    }
  };
  // const list = skuList.map((item) => ({ ...item, attributes: { ...item?.attributes } }));

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
    return skuList.map((theSKU) => {
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
      destroyOnClose
      modalRender={(comps) => {
        return cloneElement(comps, {
          ...comps.props,
          style: {
            padding: 0,
          },
        });
      }}
      onOk={() => {}}
      width={1000}
      onCancel={() => {
        dispatch({
          type: 'productManage/update',
          payload: { showSKU: false },
        });
      }}
    >
      <ProCard title="商品规格" headerBordered bodyStyle={{ paddingBottom: 0 }}>
        <GoodsSKU
          attrValue={attrParams(skuList, attrOptions)}
          onChange={getSKU}
          options={attrOptions.map((item) => ({ label: item?.attributeName, value: item?.id }))}
        />
        <div style={{ marginTop: 20 }}>
          <SKUList data={toSku} onChange={onChange} editData={tableSource} />
        </div>
      </ProCard>
    </Modal>
  );
};
export default SKUModal;

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
