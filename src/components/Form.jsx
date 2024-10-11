import React from 'react';
import { useState } from 'react';

const Form = (props) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(
      event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAdd(inputValue);
  };

  return (
    <header className="header">
      <h1>Todo</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="Qu'avez vous à faire ?"
          autoFocus
          onChange={handleChange}
          value={inputValue}
        />
        <input className="hidden" type="submit" value="Ajouter" />
      </form>
    </header>
  );
};

export default Form;
