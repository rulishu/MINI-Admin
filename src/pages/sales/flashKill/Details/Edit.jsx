import AModal from '@/components/AModal';
import SalesGoods from '@/components/SalesGoods';
import { create, updateStatus } from '@/service/sales/flashKill';
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

  const { run, loading } = useRequest(type === 'add' ? create : updateStatus, {
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
        itemName: item.activityItemName,
        id: item.activityItemId,
        stockTotal: item.stockTotal,
        skuName: item.skuName,
        sku: (item.activityItemSkuList || []).map((sku) => ({
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
      activityItemName: item.itemName,
      activityItemId: item.id,
      stockTotal: item.stockTotal,
      skuName: item.skuName,
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
        <div style={{ paddingBottom: 24, paddingRight: 24 }}>
          <Button key="save" type="primary" loading={loading} onClick={form.submit}>
            保存
          </Button>
          <Button key="cancel" onClick={() => update({ visible: false })}>
            取消
          </Button>
        </div>
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
                    title: '活动名称',
                    type: 'string',
                    required: true,
                    span: 24,
                    props: {
                      allowClear: true,
                    },
                    placeholder: '请输入活动名称',
                  },
                  activityTime: {
                    title: '活动时间',
                    type: 'range',
                    required: true,
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
                  },
                  appShow: {
                    title: '显示状态',
                    type: 'number',
                    widget: 'radio',
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
