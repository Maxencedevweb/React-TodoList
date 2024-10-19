import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import Form from './Form';
import FilterButton from './FilterButton';
import CancelButton from './CancelButton';

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
  const [list, setList] = useState(() => {
    const storedList = localStorage.getItem('todoList');
    return JSON.parse(storedList).length > 0 ? JSON.parse(storedList) : todoList;
  });
  const [filter, setFilter] = useState('all');
  const [editing, setEditing] = useState(null);
  const [oldList, setOldList] = useState([list]);
console.log(JSON.parse(localStorage.getItem('todoList')));

useEffect(() => {
  localStorage.setItem('todoList', JSON.stringify(list));
  console.log('list', list);
  console.log(JSON.parse(localStorage.getItem('todoList')));
}, [list]);

  const updateList = (newList) => {
    setOldList([...oldList, list]);
    setList(newList);
  }

  const handleAdd = (todoName) => {
    updateList([
      { id: `todo-${list.length + 1}`, name: todoName, completed: false },
      ...list,
    ]);
  };

  const handleisComplete = (todoid) => {
    updateList(
      list.map((todo) =>
        todo.id === todoid ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

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
    updateList(
    list.filter((todo) => todo.id !== todoid),
  )
  };

  const leftTodos = list.filter((todo) => !todo.completed).length;

  const handleonEdit = (todoid) => {
    setEditing(
     todoid
    );
  };

  const handleEditingSubmit = (newName, todoid) => {
    updateList(
      list.map((todo) =>
        todo.id === todoid ? { ...todo, name: newName } : todo
      )
    );
    setEditing(null);
  }

  const handleAllChecked = () => {
    if (leftTodos === 0) {
      updateList(list.map((todo) => ({ ...todo, completed: false })))
    } else {
      updateList(list.map((todo) => ({ ...todo, completed: true })))
    }
  }

  const handleDeleteCompleted = () => {
    updateList(list.filter((todo) => !todo.completed));
  }

  const handleCancel = () => { // "The 'handleCancel' function makes the dependencies of useEffect Hook (at line 129) change on every render. To fix this, wrap the definition of 'handleCancel' in its own useCallback() Hook."
    if (oldList.length > 1) { 
    updateList(oldList[oldList.length - 1]);
    setOldList(oldList.slice(0, oldList.length - 1));
    }
  };

    useEffect(() => { 
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'z') {
        event.preventDefault(); // Eviter le ctrl + z de base qui efface ce qu'on a écrit (par exemple dans input)
        handleCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown); // Evite les addEventListener qui s'accumulent à chaque re-rendu du composant (ici App.jsx)
    };
  }, [handleCancel]);

  return (
    <section className="todoapp">
      <Form onAdd={handleAdd} />
         {list.length > 0 &&
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
      }
      {(list.length > 0 || oldList.length > 1) &&
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
          <CancelButton 
          label="Annuler (ctrl + z)" 
          className="cancel"
          onClick={handleCancel} />
          </ul>
        { leftTodos !== list.length ? <button className="clear-completed" onClick={handleDeleteCompleted}>Effacer les complétés</button>: null}

      </footer>
      }
    </section>
  );
};

export default App;
