import React from 'react';
import { useState } from 'react';

const Form = (props) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <header className="header">
      <h1>Todo</h1>
      <form>
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
