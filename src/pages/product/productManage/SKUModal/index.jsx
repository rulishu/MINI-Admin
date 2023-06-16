import GoodsSKU from '@/components/sku';
import SKUList from '@/components/sku/SKUList';
import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Form, Modal } from 'antd';
import { cloneElement, useEffect, useState } from 'react';

const SKUModal = (props) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();

  const { value, onChange } = props;
  const { itemSkuVos, attributeVos, showSKU, type, attrOptions } = useSelector(
    (state) => state.productManage,
  );
  const dispatch = useDispatch();

  const [attributeData, setAttributeData] = useState(attributeVos);
  const [tableSource, setTableSource] = useState(itemSkuVos);

  useEffect(() => {
    setAttributeData(attributeVos);
    setTableSource(itemSkuVos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributeVos.length, itemSkuVos.length]);

  const onFinish = async (list = []) => {
    console.log('value: ', value);
    console.log('list: ', list);
    if (list?.length > 0) {
      if (type === 'edit') {
        // dispatch({
        //   type: 'productManage/updateSKU',
        //   payload: {
        //     itemId: queryInfo.id,
        //     list,
        //   },
        // });
      }
      console.log('attributeData: ', attributeData);

      let obj = {};
      attributeData.forEach((item) => {
        if (item?.attribute_name && item?.attribute_value) {
          const newArr =
            attributeData.filter((i) => i?.attribute_name === item?.attribute_name) || [];
          if (newArr.length > 1) {
            obj.message = '规格名不能重复';
          }
          //
          if (item?.valueList && item?.valueList?.length > 0) {
            item?.valueList.forEach((i) => {
              if (i?.value) {
                const newArr = item?.valueList.filter((data) => data?.value === i?.value) || [];
                if (newArr.length > 1) {
                  obj.message = `${item?.attribute_name}规格值不能重复`;
                }
              } else {
                obj.message = `${item?.attribute_name}规格值不能为空`;
              }
            });
          } else {
            obj.message = `${item?.attribute_name}规格值不能为空`;
          }
        } else {
          obj.message = '规格名不能为空';
        }
      });
      if (obj?.message) {
        return message.error(obj.message);
      }
      //
      let isAttr = false;
      list.forEach((item) => {
        ['goodsCost', 'price', 'membershipPrice', 'referencePrice', 'stock', 'skuCode'].forEach(
          (i) => {
            const val = item?.[i] === 0 ? '0' : item?.[i];
            if (!val) {
              obj.message = `${dataEunm[i]}不能为空`;
            }
          },
        );
        // if (item?.attributes && item?.attributes?.length > 0) {
        //   item?.attributes.forEach((i) => {
        //     if (i?.attributeId && i?.value && i?.attribute_name) {
        //       isAttr = isAttr && true;
        //     } else {
        //       isAttr = false;
        //     }
        //   });
        // } else {
        //   isAttr = false;
        // }
      });

      if (obj?.message) {
        return message.error(obj.message);
      }
      await dispatch({
        type: 'productManage/checkSKUCode',
        payload: {
          list,
          callback: () => {
            isAttr = true;
          },
        },
      });
      if (isAttr) {
        await dispatch({
          type: 'productManage/update',
          payload: {
            itemSkuVos: list,
            attributeVos: attributeData,
            showSKU: false,
          },
        });
        onChange(list);
      }
    } else {
      message.warning('请添加完整规格内容');
    }
  };

  const getSKU = (val) => {
    if (val?.length > 0) {
      setAttributeData(val);
      // setTableSource([]);
    } else {
      message.warning('请先添加规格');
    }
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
      width={1200}
      // maskClosable={false}
      // keyboard={false}
      // closable={false}
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
          form={form}
          attrValue={attributeVos}
          onChange={getSKU}
          options={attrOptions.map((item) => ({ label: item?.attributeName, value: item?.id }))}
        />
        <div style={{ marginTop: 20 }}>
          <SKUList form={form} data={attributeData} onChange={onFinish} editData={tableSource} />
        </div>
      </ProCard>
    </Modal>
  );
};
export default SKUModal;

const dataEunm = {
  goodsCost: '成本价',
  price: '销售价',
  membershipPrice: '会员价',
  referencePrice: '参考价',
  stock: '销售库存',
  skuCode: 'sku编码',
};
