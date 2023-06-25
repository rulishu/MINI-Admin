import AModal from '@/components/AModal';
import SelectUser from '@/components/SelectUser';
import Upload from '@/components/Upload';
import { create, getProductUserList, updateInfo } from '@/service/goods/supplier';
import { getUrl, getUrlToList } from '@/utils';
import { ProCard } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Cascader } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';
import { schema } from './schema';

export default () => {
  const form = useForm();
  const fn = {
    add: create,
    edit: updateInfo,
  };
  const {
    supplier: { visible, queryInfo, type },
    commonInterface: { treeList },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'supplier/update',
      payload: data,
    });
  };
  useEffect(() => {
    if (visible) {
      form.setValues({
        form1: {
          supplierName: queryInfo.supplierName || '',
          creditCode: queryInfo.creditCode || '',
          regCapital: queryInfo.regCapital || '',
          regTime: queryInfo.regTime || '',
          regAddress: queryInfo.regAddress || '',
          contactName: queryInfo.contactName || '',
          contactPhone: queryInfo.contactPhone || '',
          type: queryInfo.type,
          // address: queryInfo.address || '',
          // province: queryInfo.province && [queryInfo.province, queryInfo.city, queryInfo.district],
        },
        form2: {
          legalFrontUrl: queryInfo?.legalFrontUrl ? getUrlToList(queryInfo.legalFrontUrl) : [],
          legalBackUrl: queryInfo?.legalBackUrl ? getUrlToList(queryInfo.legalBackUrl) : [],
        },
        form3: {
          contractUrl: (queryInfo?.contractUrl && getUrlToList(queryInfo.contractUrl)) || [],
          licenseUrl: (queryInfo?.licenseUrl && getUrlToList(queryInfo.licenseUrl)) || [],
          otherUrl: (queryInfo?.otherUrl && getUrlToList(queryInfo.otherUrl)) || [],
        },
        form4: {
          productId: queryInfo.productSelector
            ? {
                label: queryInfo.productSelector,
                value: queryInfo.productId,
                phone: queryInfo.productSelectorContact,
                headUrl: queryInfo.productHeader,
              }
            : undefined,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const { mutateAsync, isLoading } = useReactMutation({
    mutationFn: fn[type],
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        update({
          visible: false,
          reload: true,
          type: '',
          queryInfo: {},
        });
      }
    },
  });

  const onFinish = (values) => {
    const { form1, form2, form3, form4 } = values;
    const params = {
      contactName: form1.contactName,
      creditCode: form1.creditCode,
      regCapital: form1.regCapital,
      regTime: form1.regTime,
      regAddress: form1.regAddress,
      supplierName: form1.supplierName,
      contactPhone: form1.contactPhone,
      type: form1.type,
      // province: form1.province && form1.province[0] && form1.province[0],
      // city: form1.province && form1.province[1] && form1.province[1],
      // district: form1.province && form1.province[2] && form1.province[2],
      // address: form1.address,
      legalFrontUrl: form2.legalFrontUrl && getUrl(form2.legalFrontUrl),
      legalBackUrl: form2.legalBackUrl && getUrl(form2.legalBackUrl),
      contractUrl: form3.contractUrl && getUrl(form3.contractUrl),
      licenseUrl: form3.licenseUrl && getUrl(form3.licenseUrl),
      otherUrl: form3.otherUrl && getUrl(form3.otherUrl),
      productId: form4.productId && form4.productId.value,
      productSelector: form4.productId && form4.productId.label,
      productSelectorContact: form4.productId && form4.productId.phone,
      supplierId: queryInfo.supplierId,
    };
    mutateAsync(params);
  };

  return (
    <AModal
      destroyOnClose={true}
      open={visible}
      onCancel={() => update({ visible: false })}
      width={800}
      footer={
        <div style={{ paddingBottom: 24, paddingRight: 24 }}>
          <Button key="save" loading={isLoading} type="primary" onClick={form.submit}>
            保存
          </Button>
          <Button key="cancel" onClick={() => update({ visible: false })}>
            取消
          </Button>
        </div>
      }
    >
      <ProCard
        title={type === 'add' ? '新增' : '编辑'}
        headerBordered
        bodyStyle={{ paddingBottom: 0 }}
      >
        <FormRender
          form={form}
          schema={schema({
            province: {
              options: treeList,
            },
            getProductUserList,
          })}
          onFinish={onFinish}
          widgets={{
            selectUser: SelectUser,
            cascader: Cascader,
            comUpload: Upload,
          }}
        />
      </ProCard>
    </AModal>
  );
};
