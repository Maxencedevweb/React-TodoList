import React from 'react';

const TodoItem = (props) => {
    return <li>
          <div className="view">
            <input id={props.id} className="toggle" type="checkbox" checked={props.complete}/>
            <label>{props.name}</label>
            <button className="destroy" />
          </div>
          <form>
            <input className="edit" defaultValue="Tester React" />
            <input type="submit" value="Valider" className="hidden" />
          </form>
        </li>
}

export default TodoItem;