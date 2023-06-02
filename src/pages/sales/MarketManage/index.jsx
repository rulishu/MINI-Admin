import { useDispatch, useSelector } from '@umijs/max';
import { Card } from 'antd';
import { useEffect, useRef } from 'react';
import ConnectTable from './ConnectTable';
import SearchForm from './SearchForm';
import TreeList from './TreeList';
import './index.less';

const SearchTable = () => {
  const proTableRef = useRef();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state);

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
        loading={loading.effects['marketManage/getMarketTree']}
        style={{ marginRight: 10, minWidth: 250, height: '100%' }}
        bodyStyle={{
          paddingLeft: 12,
          paddingRight: 12,
          width: '100%',
          height: '100%',
          overflowY: 'auto',
        }}
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
        <Card
          loading={
            loading.effects['marketManage/selectMarket'] ||
            loading.effects['marketManage/getMarketTree']
          }
          style={{ width: '100%' }}
          bodyStyle={{ paddingLeft: 12, paddingRight: 12, width: '100%' }}
        >
          <SearchForm proTableRef={proTableRef} />
        </Card>
        <Card
          loading={
            loading.effects['marketManage/selectMarket'] ||
            loading.effects['marketManage/getMarketTree']
          }
          style={{ width: '100%', marginTop: 10, flex: 1, overflow: 'auto' }}
          bodyStyle={{ paddingLeft: 12, paddingRight: 12, width: '100%', height: '100%' }}
        >
          <ConnectTable proTableRef={proTableRef} />
        </Card>
      </div>
    </div>
  );
};

export default SearchTable;
