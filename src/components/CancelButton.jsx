import React from 'react';

const CancelButton = (props) => {
  const { label, onClick } = props;

  return (
    <li>
      <button onClick={onClick}>
        {label}
      </button>
    </li>
  );
};

export default CancelButton;
