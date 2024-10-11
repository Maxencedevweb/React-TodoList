import React from 'react';

const Form = (props) => {
return <header className="header">
      <h1>Todo</h1>
      <form>
        <input
            className="new-todo"
            placeholder="Qu'avez vous à faire ?"
            autoFocus
        />
        <input className="hidden" type="submit" value="Ajouter" />
      </form>
    </header>
}

export default Form;