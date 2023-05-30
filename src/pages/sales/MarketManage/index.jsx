import { useDispatch } from '@umijs/max';
import { Card } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import ConnectTable from './ConnectTable';
import SearchForm from './SearchForm';
import TreeList from './TreeList';
import './index.less';

const SearchTable = () => {
  const dispatch = useDispatch();
  //
  const [cascaderList, setCascaderList] = useState(['zhejiang', 'hangzhou', 'xihu']);
  //
  const tableRef = useRef();
  const [scrollY, setScrollY] = useState(380);
  useEffect(() => {
    if (tableRef?.current?.clientHeight > 120) {
      setScrollY(tableRef?.current?.clientHeight - 120);
    }
  }, [cascaderList.length]);
  //
  useEffect(() => {
    dispatch({
      type: 'groupManage/getAllCategory',
    });
    // 类目tree
    dispatch({
      type: 'groupManage/getCategoryTree',
    });
    dispatch({
      type: 'marketManage/getMarketTree',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <Card
        style={{ marginRight: 10, minWidth: 250, height: '100%' }}
        bodyStyle={{ width: '100%', height: '100%', overflowY: 'auto' }}
      >
        <TreeList />
      </Card>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Card style={{ width: '100%' }} bodyStyle={{ width: '100%' }}>
          <SearchForm cascaderList={cascaderList} setCascaderList={setCascaderList} />
        </Card>
        <Card
          style={{ width: '100%', marginTop: 10, flex: 1, overflow: 'auto' }}
          bodyStyle={{ width: '100%', height: '100%' }}
        >
          <ConnectTable tableRef={tableRef} scrollY={scrollY} />
        </Card>
      </div>
    </div>
  );
};

export default connect(({ groupManage, loading }) => {
  return {
    groupManage,
    loading,
  };
})(SearchTable);
