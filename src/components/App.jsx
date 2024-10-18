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
  const handleDestroy = (todoid) => {
    setList(
    list.filter((todo) => todo.id !== todoid),
  )
  };

  const leftTodos = list.filter((todo) => !todo.completed).length;

  const [editing, setEditing] = useState(null);

  const handleonEdit = (todoid) => {
    setEditing(
     todoid
    );
  };

  const handleEditingSubmit = (newName, todoid) => {
    setList(
      list.map((todo) =>
        todo.id === todoid ? { ...todo, name: newName } : todo
      )
    );
    setEditing(null);
  }

  const handleAllChecked = () => {
    if (leftTodos === 0) {
      setList(list.map((todo) => ({ ...todo, completed: false })))
    } else {
      setList(list.map((todo) => ({ ...todo, completed: true })))
    }
  }

  const handleDeleteCompleted = () => {
    setList(list.filter((todo) => !todo.completed));
  }

  return (
    <section className="todoapp">
      <Form onAdd={handleAdd} />
      {/* Cette section doit être cachée par défaut et affichée quand il y a des todos */}
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" checked={leftTodos === 0} onClick={handleAllChecked}/>
        <label htmlFor="toggle-all">Tout compléter</label>
        <ul className="todo-list">
          {list.filter(listFiltered).map((todo) => (
            <TodoItem
              id={todo.id}
              key={todo.id}
              name={todo.name}
              complete={todo.completed}
              onComplete={() => handleisComplete(todo.id)}
              onDestroy={() => handleDestroy(todo.id)}
              editing={editing}
              onEdit={() => handleonEdit(todo.id)}
              editedValue={(newName) => handleEditingSubmit(newName, todo.id)}
            />
          ))}
         
        </ul>
      </section>
      {/* Ce footer doit être caché par défaut et affichée quand il y a des todos */}
      <footer className="footer">
        {/* Ceci devrait être "0 restants" par défaut */}
        <span className="todo-count">
        <strong>
          {leftTodos}
          </strong> {leftTodos > 1 ? 'tâches restantes' : 'tâche restante'}
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
        { leftTodos !== list.length ? <button className="clear-completed" onClick={handleDeleteCompleted}>Effacer les complétés</button>: null}

      </footer>
    </section>
  );
};

export default App;
