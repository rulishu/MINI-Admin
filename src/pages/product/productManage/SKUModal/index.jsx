import GoodsSKU from '@/components/sku';
import SKUList from '@/components/sku/SKUList';
import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Modal } from 'antd';
import { cloneElement, useEffect, useState } from 'react';

const SKUModal = (props) => {
  const { message } = App.useApp();
  const { value, onChange } = props;
  const { itemSkuVos, attributeVos, showSKU, type, showForm, attrOptions } = useSelector(
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

  const onFinish = (list = []) => {
    console.log('value: ', value);
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

  const getSKU = (val) => {
    if (val?.length > 0) {
      setAttributeData(val);
      setTableSource([]);
    } else {
      message.warning('请先添加规格');
    }
  };

  return (
    <Modal
      open={showSKU}
      destroyOnClose={showForm === true ? false : true}
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
          attrValue={attributeVos}
          onChange={getSKU}
          options={
            attrOptions.map((item) => ({ label: item?.attributeName, value: item?.id }))
            // [
            //   { label: '酒精度', value: 1 },
            //   { label: '容量', value: 2 },
            //   { label: '甜度', value: 3 },
            // ]
          }
        />
        <div style={{ marginTop: 20 }}>
          <SKUList data={attributeData} onChange={onFinish} editData={tableSource} />
        </div>
      </ProCard>
    </Modal>
  );
};
export default SKUModal;
