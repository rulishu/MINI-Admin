import { ModalForm } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { message } from 'antd';
import { useEffect } from 'react';
import FormItemWithTable from './FormItemWithTable';

const EditForm = () => {
  const dispatch = useDispatch();
  const { shippingtemplates } = useSelector((state) => state);
  const { addOpen, drawerParams, drawerType } = shippingtemplates;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (data) => {
    dispatch({
      type: 'shippingtemplates/updateState',
      payload: data,
    });
  };

  const onFinish = (data) => {
    const { parr, ...others } = data;
    let searchParams = {
      ...others,
    };
    if (drawerType === 'edit') {
      dispatch({
        type: 'shippingtemplates/updateCategory',
        payload: { searchParams },
      });
    }
    if (drawerType === 'add') {
      const arr = parr.concat([]);
      searchParams.parentArray = parr.join();
      searchParams.parentId = parr.join() === '0' ? '0' : arr?.splice(-1)?.[0];
      searchParams.status = 1;
      dispatch({
        type: 'shippingtemplates/addCategory',
        payload: { searchParams },
      });
    }
    if (drawerType === 'copy') {
      const { level, categoryName, leafOrder } = searchParams;
      dispatch({
        type: 'shippingtemplates/addCategory',
        payload: {
          searchParams: {
            level,
            categoryName,
            leafOrder,
            parentArray: parr.join(),
            parentId: drawerParams?.id,
            status: 1,
          },
        },
      });
    }
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
        }}
        onFinish={async () => {
          message.success('提交成功');
          update({ addOpen: false, drawerParams: {}, drawerType: '' });
          onFinish();
          return true;
        }}
        onValuesChange={(changeValues) => console.log(changeValues)}
        onOpenChange={(open) => {
          update({
            assignedAreaTableList: [],
            disabledAreaTableList: [],
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
