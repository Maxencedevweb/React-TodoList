import React from 'react';

const FilterButton = (props) => {
  const { label, selected, onClick } = props;

  return (
    <li>
      <button className={selected ? 'selected' : ''} onClick={onClick}>
        {label}
      </button>
    </li>
  );
};

export default FilterButton;
