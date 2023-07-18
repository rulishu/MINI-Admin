import { createCoupon, updateCoupon } from '@/service/sales/coupon';
import {
  ModalForm,
  ProFormDateTimeRangePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { DatePicker, Form, InputNumber, Space, message } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';
import SalesGoods from './SalesGoods';
const { RangePicker } = DatePicker;

export default ({ actionRef }) => {
  const dispatch = useDispatch();

  const formRef = useRef();
  const { salesActivities } = useSelector((state) => state);
  const { visible, queryInfo, type } = salesActivities;

  const update = (data) => {
    dispatch({
      type: 'salesActivities/update',
      payload: data,
    });
  };

  return (
    <>
      <ModalForm
        title="新建优惠券"
        open={visible}
        formRef={formRef}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        modalProps={{
          destroyOnClose: true,
          // width: 800,
          centered: true,
          afterOpenChange: (open) => {
            if (open && type === 'edit') {
              formRef?.current?.setFieldsValue({ ...queryInfo });
            }
          },
        }}
        onFinish={async (value) => {
          const { collectDate, useTimeRange, minandsale, spuIds, ...others } = value;
          const obj = {};
          if (collectDate && collectDate?.length === 2) {
            obj.collectBeginDate = collectDate[0];
            obj.collectEndDate = collectDate[1];
          } else {
            message.warning('请填写领取时间');
            return false;
          }
          if (value?.useTimeType === 1) {
            if (useTimeRange && useTimeRange?.length === 2) {
              obj.useBeginDate = useTimeRange[0];
              obj.useEndTime = useTimeRange[1];
            } else {
              message.warning('请填写使用时间');
              return false;
            }
          }
          if (value?.useTimeType === 2) {
            if (useTimeRange >= 0) {
              obj.effectiveDuration = useTimeRange;
            } else {
              message.warning('请填写使用时间');
              return false;
            }
          }
          //
          if (minandsale?.first >= 0 && minandsale?.second >= 0) {
            obj.minimumConsumption = minandsale?.first;
            obj.price = minandsale?.second;
          } else {
            message.warning('请填写优惠内容');
            return false;
          }
          if (value?.availableProductTypes === 3) {
            obj.spuIds = spuIds;
          }
          let api = createCoupon;
          if (type === 'edit') {
            api = updateCoupon;
          }
          const data = await api({ id: queryInfo?.id, ...obj, ...others, status: 1 });
          if (data?.code === 200) {
            message.success('提交成功');
            update({
              queryInfo: {},
              visible: false,
            });
            return true;
          } else {
            return false;
          }
        }}
        onOpenChange={(open) => {
          console.log('open: ', open);
          if (!open) {
            update({
              queryInfo: {},
            });
            actionRef.current?.reload();
          }
          update({
            visible: open,
          });
        }}
      >
        <h4 style={{ marginBottom: 12 }}>基本规则</h4>
        <ProFormText
          name="name"
          label="优惠券名称"
          required
          rules={[{ required: true, message: '优惠券名称不能为空' }]}
          // tooltip="最长为 24 位"
          placeholder="请输入优惠券名称，最多输入10个汉字"
          fieldProps={{
            maxLength: 10,
          }}
        />
        <ProFormDateTimeRangePicker
          name="collectDate"
          label="领取时间"
          required
          rules={[
            { required: true },
            {
              validator: (_, value) => {
                if (value && value?.length === 2) {
                  let endGetTime = value?.[1];
                  if (endGetTime) {
                    endGetTime = new Date(endGetTime).getTime();
                  }
                  let now = dayjs().valueOf();
                  if (now <= endGetTime) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error('领取时间已过'));
                  }
                } else {
                  return Promise.reject(new Error('请选择使用时间范围'));
                }
              },
            },
          ]}
          fieldProps={{
            style: { width: '100%' },
          }}
        />
        <ProFormSelect
          name="useTimeType"
          label="使用时间"
          initialValue={1}
          options={[
            { label: '限制日期范围', value: 1 },
            { label: '限制有效天数', value: 2 },
          ]}
          required
          rules={[{ required: true }]}
          fieldProps={{
            allowClear: false,
            onSelect: () => {
              formRef?.current?.setFieldValue('useTimeRange', undefined);
            },
          }}
        />
        <Form.Item noStyle shouldUpdate>
          {(form) => (
            <Form.Item
              label=" "
              name="useTimeRange"
              colon={false}
              required={false}
              rules={[
                {
                  validator: (_, value) => {
                    let startGetTime = form.getFieldValue('collectDate')?.[0];
                    let endGetTime = form.getFieldValue('collectDate')?.[1];
                    if (startGetTime) {
                      startGetTime = new Date(startGetTime).getTime();
                    }
                    if (endGetTime) {
                      endGetTime = new Date(endGetTime).getTime();
                    }
                    if (form.getFieldValue('useTimeType') === 1) {
                      if (value && value?.length === 2) {
                        // 有数据，判断 领取结束时间
                        let endUseTime = value?.[1];
                        if (endUseTime) {
                          endUseTime = new Date(endUseTime).getTime();
                        }
                        if (endUseTime <= startGetTime) {
                          return Promise.reject(new Error('使用时间必须大于领取时间'));
                        } else {
                          return Promise.resolve();
                        }
                      } else {
                        return Promise.reject(new Error('请选择使用时间范围'));
                      }
                    }
                    if (form.getFieldValue('useTimeType') === 2) {
                      if (value >= 0) {
                        let now = dayjs().valueOf();
                        if (now <= endGetTime) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(new Error('领取时间已过'));
                        }
                      } else {
                        return Promise.reject(new Error('请输入使用天数'));
                      }
                    }
                  },
                },
              ]}
            >
              <UseDateRange type={form.getFieldValue('useTimeType')} />
            </Form.Item>
          )}
        </Form.Item>
        <h4 style={{ marginBottom: 12 }}>优惠设置</h4>
        <ProFormSelect
          name="type"
          label="优惠内容"
          initialValue={2}
          options={[
            { label: '满减券', value: 2 },
            { label: '满折券', value: 3 },
          ]}
          required
          rules={[{ required: true }]}
          fieldProps={{
            allowClear: false,
            onSelect: () => {
              formRef?.current?.setFieldValue('minandsale', undefined);
            },
          }}
        />
        <Form.Item noStyle shouldUpdate>
          {(form) => (
            <Form.Item
              label=" "
              name="minandsale"
              colon={false}
              required={false}
              rules={[
                {
                  validator: (_, value) => {
                    if (value?.first && value?.second) {
                      if (form.getFieldValue('type') === 2) {
                        if (value?.first > value?.second) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(new Error('减免额度输入错误'));
                        }
                      } else {
                        return Promise.resolve();
                      }
                    } else {
                      return Promise.reject(new Error('请输入优惠内容'));
                    }
                  },
                },
              ]}
            >
              <Discount type={form.getFieldValue('type')} />
            </Form.Item>
          )}
        </Form.Item>
        <ProFormDigit
          label="发放量"
          name="count"
          required
          rules={[{ required: true }]}
          min={0}
          max={1000000}
          fieldProps={{ precision: 0 }}
        />
        <ProFormSelect
          name="limitCount"
          label="每人限领"
          initialValue={1}
          allowClear={false}
          valueEnum={{
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
          }}
          // placeholder="Please select a country"
          required
          rules={[{ required: true }]}
        />
        <ProFormTextArea
          name="remark"
          label="使用说明"
          placeholder="消费券使用说明"
          fieldProps={{
            showCount: true,
            maxLength: 40,
          }}
        />
        <ProFormRadio.Group
          name="availableProductTypes"
          label="适用范围"
          required
          rules={[{ required: true }]}
          options={[
            {
              label: '全部商品可用',
              value: 1,
            },
            {
              label: '自营商品可用',
              value: 2,
            },
            {
              label: '指定商品可用',
              value: 3,
            },
          ]}
        />
        <Form.Item noStyle shouldUpdate>
          {(form) =>
            form.getFieldValue('availableProductTypes') === 3 && (
              <Form.Item
                label=" "
                name="spuIds"
                colon={false}
                required={false}
                rules={[
                  {
                    validator: (_, value) => {
                      if (form.getFieldValue('availableProductTypes') === 3) {
                        if (value && value?.length > 0) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(new Error('请选择指定商品'));
                        }
                      } else {
                        return Promise.resolve();
                      }
                    },
                  },
                ]}
              >
                <SalesGoods />
              </Form.Item>
            )
          }
        </Form.Item>
      </ModalForm>
    </>
  );
};

const Discount = ({ value, onChange, type }) => {
  return (
    <div
      style={{
        backgroundColor: 'rgb(242,242,242)',
        borderRadius: 8,
        padding: 12,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <span>满</span>
      <InputNumber
        style={{ marginLeft: 12, marginRight: 12 }}
        value={value?.first}
        controls={false}
        precision={2}
        prefix="￥"
        onChange={(val) => {
          onChange({ ...value, first: val });
        }}
      />
      {type === 2 && (
        <>
          <span>减</span>
          <InputNumber
            value={value?.second}
            controls={false}
            precision={2}
            prefix="￥"
            style={{ marginLeft: 12, marginRight: 12 }}
            onChange={(val) => {
              onChange({ ...value, second: val });
            }}
          />
        </>
      )}
      {type === 3 && (
        <>
          <span>打</span>
          <InputNumber
            style={{ marginLeft: 12, marginRight: 12 }}
            controls={false}
            value={value?.second}
            precision={1}
            min={0.1}
            max={9.9}
            onChange={(val) => {
              onChange({ ...value, second: val });
            }}
          />
          <span>折</span>
        </>
      )}
    </div>
  );
};

const UseDateRange = ({ value, onChange, type }) => {
  console.log('value: ', value);
  return (
    <div
      style={{
        backgroundColor: 'rgb(242,242,242)',
        borderRadius: 8,
        padding: 12,
      }}
    >
      {type === 1 && (
        <Space direction="vertical">
          <RangePicker value={value} onChange={onChange} format="YYYY-MM-DD" />
          <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>日期范围内可用</span>
        </Space>
      )}
      {type === 2 && (
        <Space direction="vertical">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span>领取后</span>
            <InputNumber
              value={value}
              style={{ marginLeft: 12, marginRight: 12 }}
              min={0}
              controls={false}
              precision={0}
              onChange={onChange}
            />
            <span>天内，可用</span>
          </div>

          <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>按自然天计算，领取当天算一天</span>
        </Space>
      )}
    </div>
  );
};
