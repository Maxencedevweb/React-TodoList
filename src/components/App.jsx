import React from 'react';
import TodoItem from './TodoItem';
import Form from './Form';
import FilterButton from './FilterButton';
import { useState } from 'react';

const todoList = [
  {
    id: 'todo-1',
    name: 'Tester React',
    completed: true,
  },
  {
    id: 'todo-2',
    name: 'Terminer le TP',
    completed: true,
  },
  {
    id: 'todo-3',
    name: 'Offrir du saucisson au prof',
    completed: false,
  },
];

const App = () => {
  const [list, setList] = useState(todoList);
  const handleAdd = (todoName) => {
    setList([
      { id: `todo-${list.length + 1}`, name: todoName, completed: false },
      ...list,
    ]);
  };

  const handleisComplete = (todoid) => {
    setList(
      list.map((todo) =>
        todo.id === todoid ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const [filter, setFilter] = useState('all');

  const handleFilter = (activeFilter) => {
    setFilter(activeFilter);
    // listFiltered();
  };

  // J'avais fait comme ça, puis le listFiltered.map dans le return.
  // const listFiltered = () => {
  //   if (filter === 'completed') {
  //     return list.filter((todo) => todo.completed);
  //   } else if (filter === 'active') {
  //     return list.filter((todo) => !todo.completed);
  //   } else {
  //     return list;
  //   }
  // };

  const listFiltered = (todo) => {
    return filter === 'completed'
      ? todo.completed
      : filter === 'active'
      ? !todo.completed
      : true;
  };

  return (
    <section className="todoapp">
      <Form onAdd={handleAdd} />
      {/* Cette section doit être cachée par défaut et affichée quand il y a des todos */}
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Tout compléter</label>
        <ul className="todo-list">
          {list.filter(listFiltered).map((todo) => (
            <TodoItem
              id={todo.id}
              key={todo.id}
              name={todo.name}
              complete={todo.completed}
              onComplete={() => handleisComplete(todo.id)}
            />
          ))}
          <li className="editing">
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>Offrir du saucisson au prof</label>
              <button className="destroy" />
            </div>
            <form>
              <input
                className="edit"
                defaultValue="Offrir du saucisson au prof"
              />
              <input type="submit" value="Valider" className="hidden" />
            </form>
          </li>
        </ul>
      </section>
      {/* Ce footer doit être caché par défaut et affichée quand il y a des todos */}
      <footer className="footer">
        {/* Ceci devrait être "0 restants" par défaut */}
        <span className="todo-count">
          <strong>2</strong> tâches restantes
        </span>
        <ul className="filters">
          <FilterButton
            label="Tous"
            onClick={() => handleFilter('all')}
            selected={filter === 'all' ? true : false} // Je viens de voir avec la correction que effectivement, mettre true : false est inutile
          />
          <FilterButton
            label="Complétés"
            onClick={() => handleFilter('completed')}
            selected={filter === 'completed' ? true : false}
          />
          <FilterButton
            label="Actifs"
            onClick={() => handleFilter('active')}
            selected={filter === 'active' ? true : false}
          />
        </ul>
        {/* Caché si aucun élément complété restant */}
        <button className="clear-completed">Effacer les complétés</button>
      </footer>
    </section>
  );
};

export default App;
