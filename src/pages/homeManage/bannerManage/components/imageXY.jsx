import { useMouse } from 'ahooks';
import { useRef } from 'react';

export default () => {
  const ref = useRef(null);
  const mouse = useMouse(ref.current);

  return (
    <div>
      <img
        ref={ref}
        src="http://fendouzhilu.oss-cn-hangzhou.aliyuncs.com/FDZL/mall/20230525/bc32e7bf3e564a978493faddfa886a99.jpeg"
        alt=""
        width={'100%'}
        height={'auto'}
      />
      <div>
        <p>
          Mouse In Element - x: {mouse.elementX}, y: {mouse.elementY}
        </p>
      </div>
    </div>
  );
};
