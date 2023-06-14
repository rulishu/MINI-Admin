import CascaderButton from '@/components/CascaderButton';
import CategoryType from '@/components/CategoryType';
import SKUButton from '@/components/SKUButton';
import TheUpload from '@/components/Upload';
import {
  ProCard,
  ProFormCascader,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Form, Modal } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

export default () => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const formRef1 = useRef();
  const formRef2 = useRef();
  const { productManage, groupManage, supplier, commonInterface, loading } = useSelector(
    (state) => state,
  );
  const { type, queryInfo, showForm, templateIdList, itemSkuVos } = productManage;
  const { categoryList } = groupManage;
  const { suppliersList } = supplier;
  const { treeList } = commonInterface;

  const [step, setStep] = useState(0);

  const onClosed = () => {
    dispatch({
      type: 'productManage/update',
      payload: {
        showForm: false,
        reload: true,
        type: '',
        queryInfo: {},
        itemSkuVos: [],
        attributeVos: [],
        showSKU: false,
      },
    });
    setStep(0);
  };

  useEffect(() => {
    if (queryInfo?.categoryId && showForm === true && type === 'edit') {
      console.log('queryInfo: ', queryInfo);
      // formRef1?.current?.setFieldsValue({
      //   mainGraphs: queryInfo?.mainGraphs,
      //   categoryId: queryInfo?.categoryId,
      // });
      // formRef2?.current?.setFieldsValue({
      //   ...queryInfo,
      // });
      setStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showForm]);

  useEffect(() => {
    if (itemSkuVos.length > 0) {
      const newData = formRef2.current?.getFieldsValue();
      formRef2.current?.setFieldsValue({ ...newData, price: getMinSale(), stock: allStocks() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSkuVos]);

  const handlerCity = (data) => {
    const arr = [];
    data.forEach((item) => {
      const obj = { label: item?.areaName, value: item?.areaId };
      if (item?.children && item?.children.length > 0) {
        obj.children = handlerCity(item.children);
      }
      arr.push(obj);
    });

    return arr;
  };
  const cityTreeList = () => {
    if (treeList && treeList.length > 0) {
      return [...handlerCity(treeList)];
    } else {
      return [];
    }
  };
  const allStocks = () => {
    let stock = 0;
    itemSkuVos.forEach((item) => {
      if (item?.stock) {
        stock = stock + Number(item?.stock);
      }
    });
    return stock;
  };

  const getMinSale = () => {
    itemSkuVos.sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      // a 一定等于 b
      return 0;
    });
    return itemSkuVos?.[0]?.price || 0;
  };

  return (
    <>
      <StepsForm
        current={step}
        onCurrentChange={(current) => setStep(current)}
        formRef={formRef}
        onFinish={(values) => {
          console.log('保存: ', { ...values, itemSkuVos });
          let closeType = false;
          dispatch({
            type: 'productManage/editGoods',
            payload: {
              values,
              callback: () => {
                onClosed();
                closeType = true;
              },
            },
          });
          return closeType;
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title={type === 'add' ? '新增商品' : '编辑商品'}
              width={1000}
              onCancel={() => onClosed()}
              open={showForm}
              keyboard={false}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
        submitter={{
          render: (props) => {
            if (props.step === 0) {
              return [
                <Button key="cancel" onClick={() => onClosed()}>
                  取消
                </Button>,
                <Button type="primary" key="goToTree" onClick={() => props.onSubmit?.()}>
                  下一步
                </Button>,
              ];
            }

            return [
              <Button
                key="gotoTwo"
                onClick={() => {
                  const newData = formRef1.current?.getFieldsValue();
                  const mainGraphs = formRef2.current?.getFieldsValue()?.mainGraphs;
                  const obj = {
                    ...newData,
                  };
                  if (mainGraphs && mainGraphs?.length > 0) {
                    obj.mainGraphs = mainGraphs;
                  }
                  formRef1.current.setFieldsValue(obj);
                  props.onPre?.();
                }}
              >
                上一步
              </Button>,
              <Button
                type="primary"
                key="goToTree"
                loading={loading.global}
                onClick={() => props.onSubmit?.()}
              >
                提交
              </Button>,
            ];
          },
        }}
      >
        <StepsForm.StepForm
          formRef={formRef1}
          name="main"
          title="选择主图/类目"
          // onValuesChange={(changeValues) => {
          //   console.log('StepForm1', changeValues);
          // }}
          initialValues={{ ...queryInfo }}
          onFinish={async () => {
            const newData = formRef1.current?.getFieldsValue();
            formRef2.current.setFieldsValue({
              itemType: 1,
              groundType: 1,
              openTime: dayjs(),
              ...queryInfo,
              ...newData,
            });
            console.log('第1111步');
            return true;
          }}
        >
          <ProCard
            title="主图"
            headerBordered
            style={{
              marginBlockEnd: 16,
              minWidth: 700,
              maxWidth: '100%',
            }}
          >
            <Form.Item
              name="mainGraphs"
              label=""
              rules={[{ required: true }]}
              extra="图片支持PNG、JPG、JPEG格式，大小不超过5MB，宽高比例为1:1"
            >
              <TheUpload
                listType="picture-card"
                maxCount={20}
                limitSize={5}
                multiple={true}
                accept=".png, .jpg, .jpeg"
              />
            </Form.Item>
            {/* <ProFormUploadButton
              name="mainGraphs"
              label=""
              max={20}
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
                multiple: true,
                maxCount: 20,
                accept: '.png, .jpg, .jpeg',
              }}
              rules={[{ required: true }]}
              title="上传"
              // action="/upload.do"
              extra=" 图片支持PNG、JPG、JPEG格式，大小不超过5MB，宽高比例为1:1"
            /> */}
          </ProCard>
          <ProCard
            title="选择商品类目"
            headerBordered
            style={{
              marginBlockEnd: 16,
              minWidth: 700,
              maxWidth: '100%',
            }}
          >
            <Form.Item
              name="categoryId"
              label=""
              rules={[
                {
                  validator: (_, value) => {
                    if (
                      categoryList.find((item) => item?.id === value?.[value.length - 1])
                        ?.leafOrder !== 1
                    ) {
                      return Promise.reject(new Error('请选择叶子类目'));
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <CategoryType />
            </Form.Item>
          </ProCard>
        </StepsForm.StepForm>
        {/* 第二步 */}
        <StepsForm.StepForm
          initialValues={{ ...queryInfo }}
          formRef={formRef2}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 22 }}
          // onValuesChange={(changeValues) => {
          //   console.log('StepForm2', changeValues);
          // }}
          name="detail"
          title="详情"
        >
          <ProCard
            title="商品分类"
            headerBordered
            style={{
              marginBlockEnd: 16,
              minWidth: 700,
              maxWidth: '100%',
            }}
          >
            {/* <ProFormCascader
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              fieldProps={{
                disabled: true,
                options: options(),
              }}
              rules={[{ required: true }]}

              name="categoryId"
              label="商品类目"
            /> */}

            <Form.Item
              name="categoryId"
              label="商品类目"
              rules={[
                { required: true },
                {
                  validator: (_, value) => {
                    if (
                      categoryList.find((item) => item?.id === value?.[value.length - 1])
                        ?.leafOrder !== 1
                    ) {
                      return Promise.reject(new Error('请选择叶子类目'));
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <CascaderButton
                disabled={true}
                onClick={() => {
                  setStep(0);
                }}
              />
            </Form.Item>
          </ProCard>
          <ProCard
            title="基础信息"
            headerBordered
            style={{
              marginBlockEnd: 16,
              minWidth: 700,
              maxWidth: '100%',
            }}
          >
            <ProFormText
              name="itemName"
              label="商品标题"
              // tooltip="最长为 24 位，用于标定的唯一 id"
              placeholder="请输入商品标题"
              rules={[{ required: true }]}
            />
            <ProFormTextArea name="details" label="商品描述" placeholder="请输入备注" />

            <ProFormRadio.Group
              name="itemType"
              label="商品类型"
              rules={[{ required: true }]}
              options={[
                { label: '标准商品', value: 1 },
                { label: '定制商品', value: 2 },
              ]}
            />
            <ProFormSelect
              name="suppliersId"
              label="供应商"
              rules={[{ required: true }]}
              options={suppliersList.map((item) => ({
                label: `${item?.supplierName}(推荐人：${item?.productSelector})`,
                value: item?.supplierId,
              }))}
              fieldProps={{
                showSearch: true,
                optionFilterProp: 'label',
                filterOption: (input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
                labelInValue: true,
              }}
            />
            <ProFormCascader
              name="provenance"
              label="商品溯源地"
              rules={[{ required: true }]}
              extra=" 商品溯源地用于追踪该商品的归属镖局，例：萧山区的商品会依次被萧山镖局->杭州镖局->浙江镖局捕获"
              fieldProps={{
                options: cityTreeList(),
              }}
            />
          </ProCard>
          <ProCard
            title="图文信息"
            headerBordered
            style={{
              marginBlockEnd: 16,
              minWidth: 700,
              maxWidth: '100%',
            }}
          >
            {/* <ProFormUploadButton
              name="mainGraphs"
              label="主图"
              rules={[{ required: true }]}
              max={20}
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
              }}
              action="/upload.do"
              extra="图片支持PNG、JPG、JPEG格式，大小不超过5MB，宽高比例为1:1"
            /> */}
            <Form.Item
              name="mainGraphs"
              label="主图"
              rules={[{ required: true }]}
              extra="图片支持PNG、JPG、JPEG格式，大小不超过5MB，宽高比例为1:1"
            >
              <TheUpload
                listType="picture-card"
                maxCount={20}
                limitSize={5}
                multiple={true}
                accept=".png, .jpg, .jpeg"
              />
            </Form.Item>

            {/* <ProFormUploadButton
              name="itemVideo"
              label="视频"
              rules={[{ required: true }]}
              max={1}
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
              }}
              action="/upload.do"
              extra="1.仅支持mp4格式上传，大小100M内，建议30秒内短视频最佳"
            /> */}
            <Form.Item
              name="itemVideo"
              label="视频"
              // rules={[{ required: true }]}
              extra="仅支持mp4格式上传，大小100M内，建议30秒内短视频最佳"
            >
              <TheUpload
                listType="picture-card"
                maxCount={1}
                limitSize={100}
                multiple={true}
                accept=".mp4"
              />
            </Form.Item>
            {/* <ProFormUploadButton
              name="itemImageVoList"
              label="详情图"
              rules={[{ required: true }]}
              max={20}
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
              }}
              action="/upload.do"
              extra="图片支持PNG、JPG、JPEG格式，大小不超过5MB"
            /> */}
            <Form.Item
              name="itemImageVoList"
              label="详情图"
              rules={[{ required: true }]}
              extra="图片支持PNG、JPG、JPEG格式，大小不超过5MB"
            >
              <TheUpload
                listType="picture-card"
                maxCount={20}
                limitSize={5}
                multiple={true}
                accept=".png, .jpg, .jpeg"
              />
            </Form.Item>
          </ProCard>
          <ProCard
            title="销售信息"
            headerBordered
            style={{
              marginBlockEnd: 16,
              minWidth: 700,
              maxWidth: '100%',
            }}
          >
            <Form.Item name="itemSkuVos" label="商品规格" rules={[{ required: true }]}>
              <SKUButton />
            </Form.Item>
            <ProFormText name="stock" disabled={true} label="总库存" rules={[{ required: true }]} />
            <ProFormText
              name="price"
              label="售卖价格"
              disabled={true}
              rules={[{ required: true }]}
            />
            <ProFormText name="spuCode" label="SPU编码" />
          </ProCard>
          <ProCard
            title="服务与其他"
            headerBordered
            style={{
              marginBlockEnd: 16,
              minWidth: 700,
              maxWidth: '100%',
            }}
          >
            <ProFormSelect
              name="templateId"
              label="运费模版"
              rules={[{ required: true }]}
              options={templateIdList.map((item) => ({
                label: item?.name,
                value: item?.id,
              }))}
              fieldProps={{
                labelInValue: true,
                // filterOption: ,
              }}
            />
            <ProFormRadio.Group
              name="groundType"
              label="上架时间"
              rules={[{ required: true }]}
              options={[
                { label: '立即上架', value: 1 },
                { label: '定时上架', value: 2 },
                { label: '放入仓库', value: 3 },
              ]}
            />
            <Form.Item noStyle shouldUpdate>
              {(form) => {
                return (
                  <ProFormDateTimePicker
                    name="openTime"
                    label="日期选择"
                    hidden={form.getFieldValue('groundType') === 2 ? false : true}
                    rules={[{ required: form.getFieldValue('groundType') === 3 ? false : true }]}
                    fieldProps={{
                      style: { width: '100%' },
                      showTime: {
                        format: 'HH:mm',
                      },
                      format: (value) => value.format('YYYY-MM-DD HH:mm'),
                    }}
                  />
                );
              }}
            </Form.Item>
          </ProCard>
          {/*
          <ProForm.Group>
            <ProFormRadio.Group
              name="groundType"
              label="上架时间"
              rules={[{ required: true }]}
              options={[
                { label: '立即上架', value: 1 },
                { label: '定时上架', value: 2 },
                { label: '放入仓库', value: 3 },
              ]}
            />
            <ProFormDateTimePicker
              name="openTime"
              label="日期选择"
              fieldProps={{
                showTime: {
                  format: 'HH:mm',
                },
                format: (value) => value.format('YYYY-MM-DD'),
              }}
            />
          </ProForm.Group> */}
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};
