import { InputNumber } from 'antd';
import { useEffect, useState } from 'react';

const Freight = ({ value, onChange, showTooltip = false }) => {
  console.log('value: ', value);
  const [allData, setAllData] = useState({});
  useEffect(() => {
    setAllData(value);
  }, [value]);
  console.log('allData: ', allData);

  return (
    <div>
      {showTooltip && (
        <div style={{ color: 'rgb(170,170,170)', marginBottom: 6 }}>
          除指定地区外，其余地区运费采用：“默认运费”
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {showTooltip ? '默认运费：' : null}
        <InputNumber
          value={allData?.firstPart}
          onChange={(value) => {
            setAllData({ ...allData, firstPart: value });
            onChange({ ...allData, firstPart: value });
          }}
          precision={0}
          controls={false}
          min={1}
          max={999}
          style={{ width: 65 }}
          size="small"
        />
        件以内，
        <InputNumber
          value={allData?.freightCharge}
          onChange={(value) => {
            setAllData({ ...allData, freightCharge: value });
            onChange({ ...allData, freightCharge: value });
          }}
          min={0}
          max={999.99}
          precision={2}
          controls={false}
          style={{ width: 65 }}
          size="small"
        />
        元， 每增加
        <InputNumber
          value={allData?.continuedEmphasis}
          onChange={(value) => {
            setAllData({ ...allData, continuedEmphasis: value });
            onChange({ ...allData, continuedEmphasis: value });
          }}
          precision={0}
          min={1}
          max={999}
          controls={false}
          style={{ width: 65 }}
          size="small"
        />
        件， 增加运费
        <InputNumber
          value={allData?.feesRenewal}
          onChange={(value) => {
            setAllData({ ...allData, feesRenewal: value });
            onChange({ ...allData, feesRenewal: value });
          }}
          min={0}
          max={999.99}
          precision={2}
          controls={false}
          style={{ width: 65 }}
          size="small"
        />
        元
      </div>
    </div>
  );
};

export default Freight;
