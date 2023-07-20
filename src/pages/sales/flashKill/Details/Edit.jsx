import AModal from '@/components/AModal';
import SalesGoods from '@/components/SalesGoods';
import { create, updateInfo } from '@/service/sales/flashKill';
import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';
import { hideEnum } from '../enum';

export default ({ reload }) => {
  const form = useForm();
  const {
    flashKill: { visible, queryInfo, type },
  } = useSelector((state) => state);

  const { run, loading } = useRequest(type === 'add' ? create : updateInfo, {
    manual: true,
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        update({ visible: false, type: '', queryInfo: {} });
        reload?.();
      }
    },
  });
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'flashKill/update',
      payload: data,
    });
  };

  useEffect(() => {
    if (visible) {
      const data = queryInfo.activityItemList || [];
      const newActivityItemList = data.map((item) => ({
        mainGraph: item.mainGraph,
        price: item.price,
        itemName: item.activityItemName,
        id: item.activityItemId,
        stockTotal: item.stockTotal,
        skuName: item.skuName,
        discountRange: item.discountRange,
        sku: (item.activityItemSkuDtoList || []).map((sku) => ({
          skuId: sku.activitySkuId,
          id: item.activityItemId,
          activityPrice: sku.activityPrice,
          activityStock: sku.activityStock,
          stock: sku.stock,
          price: sku.price,
          attributes: sku.attributes,
        })),
      }));
      form.setValues({
        form1: {
          activityName: queryInfo.activityName,
          activityTime: queryInfo.activityStartTime &&
            queryInfo.activityEndTime && [queryInfo.activityStartTime, queryInfo.activityEndTime],
        },
        form2: {
          buyNum: queryInfo.buyNum,
          appShow: queryInfo.appShow,
          activityItemList: newActivityItemList || [],
        },
      });
    }
  }, [visible]);

  const onFinish = (values) => {
    const { form1, form2 } = values;
    const data = form2.activityItemList || [];
    const newActivityItemList = data.map((item) => ({
      mainGraph: item.mainGraph,
      price: item.price,
      activityItemName: item.itemName,
      activityItemId: item.id,
      stockTotal: item.stockTotal,
      skuName: item.skuName,
      discountRange: item.discountRange,
      activityItemSkuList: (item.sku || []).map((sku) => ({
        activitySkuId: sku.skuId,
        activityItemId: item.id,
        activityPrice: sku.activityPrice,
        activityStock: sku.activityStock,
        stock: sku.stock,
        price: sku.price,
        attributes: sku.attributes,
      })),
    }));
    const params = {
      id: queryInfo.id,
      activityName: form1.activityName,
      activityStartTime: form1.activityTime && form1.activityTime[0] && form1.activityTime[0],
      activityEndTime: form1.activityTime && form1.activityTime[1] && form1.activityTime[1],
      buyNum: form2.buyNum,
      appShow: form2.appShow,
      activityItemList: newActivityItemList,
    };
    run(params);
  };

  return (
    <AModal
      destroyOnClose={true}
      open={visible}
      width={1000}
      onCancel={() => update({ visible: false })}
      footer={
        type === 'view' ? null : (
          <div style={{ paddingBottom: 24, paddingRight: 24 }}>
            <Button key="save" type="primary" loading={loading} onClick={form.submit}>
              保存
            </Button>
            <Button key="cancel" onClick={() => update({ visible: false })}>
              取消
            </Button>
          </div>
        )
      }
    >
      <ProCard
        title={type === 'add' ? '新增' : '修改'}
        headerBordered
        bodyStyle={{ paddingBottom: 0 }}
      >
        <FormRender
          form={form}
          labelWidth={120}
          maxWidth={250}
          widgets={{
            saleGoods: SalesGoods,
          }}
          schema={{
            type: 'object',
            displayType: 'row',
            properties: {
              form1: {
                type: 'object',
                widget: 'lineTitle',
                title: '基本规则',
                properties: {
                  activityName: {
                    disabled: type === 'view',
                    title: '活动名称',
                    type: 'string',
                    required: true,
                    span: 24,
                    max: 10,
                    props: {
                      allowClear: true,
                    },
                    placeholder: '请输入活动名称，不超过10字',
                  },
                  activityTime: {
                    title: '活动时间',
                    type: 'range',
                    required: true,
                    disabled: type === 'view',
                    widget: 'dateRange',
                    span: 24,
                    props: {
                      showTime: true,
                      format: 'YYYY-MM-DD HH:mm:ss',
                    },
                  },
                },
              },
              form2: {
                type: 'object',
                widget: 'lineTitle',
                title: '优惠规则',
                properties: {
                  buyNum: {
                    title: '每人每种限购',
                    type: 'number',
                    widget: 'inputNumber',
                    disabled: type === 'view',
                    required: true,
                    span: 24,
                    props: {
                      min: 0,
                      addonBefore: '件',
                      step: 1,
                    },
                  },
                  activityItemList: {
                    title: '选择商品',
                    required: true,
                    span: 24,
                    type: 'array',
                    widget: 'saleGoods',
                    props: {
                      disabled: type === 'view',
                    },
                    rules: [
                      {
                        validator: (_, value) => {
                          const i = (value || []).findIndex(
                            (x) => !x.stockTotal || !x.discountRange,
                          );
                          if (i === -1) {
                            return true;
                          }
                          return false;
                        },
                        message: '请设置规格优惠！',
                      },
                    ],
                  },
                  appShow: {
                    title: '显示状态',
                    type: 'number',
                    widget: 'radio',
                    disabled: type === 'view',
                    span: 24,
                    props: {
                      options: Object.keys(hideEnum).map((key) => ({
                        label: hideEnum[key].text,
                        value: parseInt(key),
                      })),
                    },
                  },
                },
              },
            },
          }}
          onFinish={onFinish}
        />
      </ProCard>
    </AModal>
  );
};
