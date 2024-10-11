import React from 'react';

const TodoItem = (props) => {
    return <li className="completed">
          <div className="view">
            <input className="toggle" type="checkbox" checked />
            <label>Tester React</label>
            <button className="destroy" />
          </div>
          <form>
            <input className="edit" defaultValue="Tester React" />
            <input type="submit" value="Valider" className="hidden" />
          </form>
        </li>
}

export default TodoItem;