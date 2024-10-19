import React from 'react';

const CancelButton = (props) => {
  const { label, onClick, className } = props;

  return (
    <li>
      <button onClick={onClick} className={className}>
        {label}
      </button>
    </li>
  );
};

export default CancelButton;
