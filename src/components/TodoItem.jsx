import React from 'react';

const TodoItem = (props) => {
  const { id, name, complete, onComplete } = props;

  return (
    <li className={complete ? 'completed' : ''}>
      <div className="view">
        <input
          id={id}
          className="toggle"
          type="checkbox"
          checked={complete}
          onChange={onComplete}
        />
        <label>{name}</label>
        <button className="destroy" />
      </div>
      <form>
        <input className="edit" defaultValue={name} />
        <input type="submit" value="Valider" className="hidden" />
      </form>
    </li>
  );
};

export default TodoItem;
