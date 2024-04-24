import React from 'react';
import { InputNumber } from 'antd';
import { debounce } from 'lodash';

interface LimitProps {
  onChange: (value: number | null) => void;
}

const Limit: React.FC<LimitProps> = ({ onChange }) => {
  const debouncedHandleLimitChange = React.useRef(
    debounce((value: number | null) => {
      onChange(value);
    }, 150),
  ).current;

  const handleLimitChange = (value: number | null) => {
    if (typeof value === 'number') {
      debouncedHandleLimitChange(value);
    } else {
      debouncedHandleLimitChange(null);
    }
  };

  return <InputNumber min={1} defaultValue={15} onChange={handleLimitChange} />;
};

export default Limit;
