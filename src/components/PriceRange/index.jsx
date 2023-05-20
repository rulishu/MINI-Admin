import { InputNumber } from 'antd';
import { useState } from 'react';

const PriceRange = ({ value = [undefined, undefined], onChange }) => {
  const [number, setNumber] = useState(value);

  const onBeforeChange = (value) => {
    const arr = [value, number[1]];
    setNumber(arr);
    onChange(arr);
  };

  const onAfterChange = (value) => {
    const arr = [number[0], value];
    setNumber(arr);
    onChange(arr);
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
      }}
    >
      <InputNumber
        defaultValue={value[0]}
        min={0}
        style={{ width: '45%' }}
        onChange={onBeforeChange}
      />
      <div style={{ width: '10%', textAlign: 'center', fontSize: 'large' }}>-</div>
      <InputNumber
        defaultValue={value[1]}
        min={0}
        style={{ width: '45%' }}
        onChange={onAfterChange}
      />
    </div>
  );
};

export default PriceRange;
