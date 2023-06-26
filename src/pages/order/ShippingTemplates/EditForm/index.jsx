import { ModalForm } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { message } from 'antd';
import FormItemWithTable from './FormItemWithTable';

const EditForm = () => {
  const dispatch = useDispatch();
  const { shippingtemplates } = useSelector((state) => state);
  const { addOpen, assignedAreaTableList } = shippingtemplates;

  const update = (data) => {
    dispatch({
      type: 'shippingtemplates/updateState',
      payload: data,
    });
  };

  return (
    <>
      <ModalForm
        title="新建模板"
        open={addOpen}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 21 }}
        layout="horizontal"
        modalProps={{
          destroyOnClose: true,
          width: 1000,
          centered: true,
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
                  if (i.slice(-4) === '0000') {
                    // 省
                    VoList.push({ ...obj, province: i });
                    // treeList[i]?.children?.forEach((city) => {
                    //   if (city?.children) {
                    //     city?.children.forEach((area) => {
                    //       district.push(area?.areaCode);
                    //     });
                    //   }
                    // });
                  } else {
                    if (i.slice(-2) === '00') {
                      // 市
                      VoList.push({ ...obj, city: i });
                      // treeList[`${i.slice(0, 2)}0000`]?.children?.[i]?.children?.forEach((area) => {
                      //   district.push(area?.areaCode);
                      // });
                    } else {
                      // 区
                      VoList.push({ ...obj, district: i });
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

          return type;
        }}
        onValuesChange={(changeValues) => console.log(changeValues)}
        onOpenChange={(open) => {
          update({
            assignedAreaTableList: [],
            disabledAreaTableList: [],
            unchecked: [],
            editAreaId: '',
            areaListType: 'can',
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
