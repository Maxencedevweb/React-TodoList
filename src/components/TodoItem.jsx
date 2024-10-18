import React from 'react';
import { useState } from 'react';

const TodoItem = (props) => {
  const { id, name, complete, onComplete, onDestroy, editing, onEdit, editingSubmit, editedValue } = props;
console.log(editing)


const [inputValue, setInputValue] = useState(name);
const handleChange = (event) => {
  setInputValue(
    event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
  );
};

const handleSubmit = (event) => {
  event.preventDefault();
  editedValue(inputValue);
}

  return (
    <li className={editing === id ? 'editing' : complete ? 'completed' : ''} onDoubleClick={onEdit}>
      <div className="view">
        <input
          id={id}
          className="toggle"
          type="checkbox"
          checked={complete}
          onChange={onComplete}
        />
        <label>{name}</label>
        <button className="destroy"
        onClick={onDestroy}/>
      </div>
      { editing && <form onSubmit={handleSubmit}> {/* editing && pour l'autoFocus et rendre que quand on en a besoin */}
        <input type="text" autoFocus className="edit" defaultValue={name} value={inputValue} onChange={handleChange} onBlur={handleSubmit}/>
        <input type="submit" value="Valider" className="hidden" />
      </form>}
    </li>
  );
};

export default TodoItem;
