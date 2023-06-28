import { ModalForm } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { message } from 'antd';
import { useRef } from 'react';
import FormItemWithTable from './FormItemWithTable';

const EditForm = ({ actionRef }) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const { shippingtemplates } = useSelector((state) => state);
  const { addOpen, assignedAreaTableList, drawerParams, drawerType } = shippingtemplates;

  const update = (data) => {
    dispatch({
      type: 'shippingtemplates/updateState',
      payload: data,
    });
  };

  return (
    <>
      <ModalForm
        title={drawerType === 'edit' ? '编辑模板' : '新建模板'}
        open={addOpen}
        formRef={formRef}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 21 }}
        layout="horizontal"
        modalProps={{
          destroyOnClose: true,
          width: 1000,
          centered: true,
          afterOpenChange: (open) => {
            if (open && drawerType !== 'add' && drawerParams?.id) {
              formRef?.current?.setFieldsValue({
                name: drawerParams?.name,
                chargeMode: drawerParams?.chargeMode,
                freightObj: {
                  firstPart: drawerParams?.firstPart,
                  freightCharge: drawerParams?.freightCharge,
                  continuedEmphasis: drawerParams?.continuedEmphasis,
                  feesRenewal: drawerParams?.feesRenewal,
                },
              });
            }
          },
        }}
        onFinish={async (value) => {
          let msg = '';
          let VoList;
          if (assignedAreaTableList && assignedAreaTableList.length > 0) {
            VoList = [];
            assignedAreaTableList.forEach((item) => {
              if (
                item?.firstPart &&
                item?.freightCharge &&
                item?.continuedEmphasis &&
                item?.feesRenewal
              ) {
                // 选中的数据
                const { selectList } = item;
                const obj = {
                  firstPart: item?.firstPart,
                  freightCharge: item?.freightCharge,
                  continuedEmphasis: item?.continuedEmphasis,
                  feesRenewal: item?.feesRenewal,
                };
                selectList.forEach((i) => {
                  if (drawerType !== 'edit') {
                    if (i.slice(-4) === '0000') {
                      // 省
                      VoList.push({ ...obj, province: i });
                    } else {
                      if (i.slice(-2) === '00') {
                        // 市
                        VoList.push({ ...obj, city: i });
                      } else {
                        // 区
                        VoList.push({ ...obj, district: i });
                      }
                    }
                  } else {
                    // 编辑时要带上ID
                    if (i.slice(-4) === '0000') {
                      // 省
                      if (item?.editObj?.[i]) {
                        VoList.push({ ...obj, province: i, ...item?.editObj?.[i] });
                      } else {
                        VoList.push({ ...obj, province: i });
                      }
                    } else {
                      if (i.slice(-2) === '00') {
                        // 市
                        if (item?.editObj?.[i]) {
                          VoList.push({ ...obj, city: i, ...item?.editObj?.[i] });
                        } else {
                          VoList.push({ ...obj, city: i });
                        }
                      } else {
                        // 区
                        if (item?.editObj?.[i]) {
                          VoList.push({ ...obj, district: i, ...item?.editObj?.[i] });
                        } else {
                          VoList.push({ ...obj, district: i });
                        }
                      }
                    }
                  }
                });
              } else {
                msg = '指定地区运费不能为空';
              }
            });
          }

          if (msg) {
            return message.warning(msg);
          }

          let type = false;
          if (drawerType === 'edit') {
            await dispatch({
              type: 'shippingtemplates/updateTemplate',
              payload: {
                value,
                VoList,
                callback: () => {
                  type = true;
                },
              },
            });
          } else {
            // copy add 都是新增
            await dispatch({
              type: 'shippingtemplates/addTemplate',
              payload: {
                value,
                VoList,
                callback: () => {
                  type = true;
                },
              },
            });
          }

          return type;
        }}
        onOpenChange={(open) => {
          if (!open) {
            update({
              assignedAreaTableList: [],
              disabledAreaTableList: [],
              unchecked: [],
              drawerParams: {},
              editAreaId: '',
              areaListType: 'can',
            });
            actionRef.current?.reload();
          }
          update({
            addOpen: open,
          });
        }}
        submitter={{
          searchConfig: {
            submitText: '保存',
            resetText: '取消',
          },
        }}
      >
        <FormItemWithTable />
      </ModalForm>
    </>
  );
};

export default EditForm;
