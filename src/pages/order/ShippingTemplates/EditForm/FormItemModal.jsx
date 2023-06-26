import { useDispatch, useSelector } from '@umijs/max';
import { Card, Modal } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MultiCascader } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const EditForm = () => {
  const dispatch = useDispatch();
  const spanRef = useRef();
  const { shippingtemplates, commonInterface } = useSelector((state) => state);
  const {
    isModalOpen,
    disabledList,
    editAreaId,
    assignedAreaTableList,
    disabledAreaTableList,
    unchecked,
    areaListType,
  } = shippingtemplates;
  const { treeList } = commonInterface;

  const [theAreaList, setIsList] = useState([]); // 选中区域列表

  const update = (data) => {
    dispatch({
      type: 'shippingtemplates/updateState',
      payload: data,
    });
  };

  useEffect(() => {
    if (editAreaId) {
      console.log('editAreaId: ', editAreaId);
      if (areaListType === 'can') {
        const obj = assignedAreaTableList.find((item) => item?.id === editAreaId);
        setIsList(obj?.selectList || []);
      } else if (areaListType === 'not') {
        const obj = disabledAreaTableList.find((item) => item?.id === editAreaId);
        setIsList(obj?.selectList || []);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editAreaId]);

  const handlerCity = (data) => {
    const arr = [];
    data.forEach((item) => {
      const obj = { label: item?.areaName, value: item?.areaCode };
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

  const testingData = useMemo(
    () => [...cityTreeList()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [treeList],
  );

  return (
    <Modal
      destroyOnClose
      title="运费地区设置"
      width={800}
      centered
      open={isModalOpen}
      onOk={() => {
        const label = spanRef?.current?.innerText;

        let changeList = [];
        if (areaListType === 'can') {
          changeList = assignedAreaTableList;
        } else if (areaListType === 'not') {
          changeList = disabledAreaTableList;
        }
        // 给表格数据赋值
        const arr = changeList.concat([]);
        if (editAreaId) {
          const theIndex = changeList.findIndex((item) => item?.id === editAreaId);
          if (theIndex > -1) {
            arr[theIndex]['selectList'] = theAreaList;
            arr[theIndex]['selectLabel'] = label;
          } else {
            arr.push({
              id: editAreaId,
              selectList: theAreaList,
              selectLabel: label,
            });
          }
        } else {
          const now = new Date();
          const id = `${now.getTime()}_${changeList.length + 1}`;
          arr.push({
            id: id,
            selectList: theAreaList,
            selectLabel: label,
          });
        }
        // 关闭后清空选中数据
        if (areaListType === 'can') {
          update({ unchecked: [], assignedAreaTableList: arr, editAreaId: '', disabledList: [] });
        } else if (areaListType === 'not') {
          update({ unchecked: [], disabledAreaTableList: arr, editAreaId: '', disabledList: [] });
        }
        setIsList([]);
        update({ isModalOpen: false });
      }}
      onCancel={() => {
        setIsList([]);
        update({ unchecked: [], editAreaId: '', disabledList: [], isModalOpen: false });
      }}
    >
      <div style={{ marginBottom: 12 }}>选择区域</div>
      <Card size="small" bodyStyle={{ borderRadius: 8 }}>
        <MultiCascader
          inline
          value={theAreaList}
          disabledItemValues={disabledList} // 禁用
          uncheckableItemValues={unchecked} // 不可选
          data={testingData}
          searchable={false}
          menuHeight={300}
          menuWidth={240}
          //   onChange={(value) => {
          //     console.log('value: ', value);
          //   }}
          onCheck={(value, item, checked, event) => {
            console.log('value, item, checked, event: ', value, item, checked, event);
            const arr = [];
            value.forEach((item) => {
              if (disabledList.findIndex((i) => i === item) === -1) {
                arr.push(item);
              }
            });
            setIsList(arr);
          }}
        />
      </Card>
      <div style={{ marginTop: 12, marginBottom: 12 }}>
        已选择{theAreaList.length > 0 ? `(${theAreaList.length})` : ''}
      </div>
      <Card size="small">
        {theAreaList.length > 0 ? (
          <MultiCascader
            defaultValue={theAreaList}
            plaintext
            block
            data={testingData}
            renderValue={(value, selectedItems) => (
              <span ref={spanRef}>{selectedItems.map((item) => item.label).join(' , ')}</span>
            )}
          />
        ) : (
          <div style={{ height: 22 }}> </div>
        )}
      </Card>
    </Modal>
  );
};

export default EditForm;
