import React from 'react'

const App = () => {

  return <section className="todoapp">
    <header className="header">
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
    {/* Cette section doit être cachée par défaut et affichée quand il y a des todos */}
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
      />
      <label htmlFor="toggle-all">Tout compléter</label>
      <ul className="todo-list">
        <li className="completed">
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
        <li>
          <div className="view">
            <input className="toggle" type="checkbox" />
            <label>Terminer le TP</label>
            <button className="destroy" />
          </div>
          <form>
            <input className="edit" defaultValue="Terminer le TP" />
            <input type="submit" value="Valider" className="hidden" />
          </form>
        </li>
        <li className="editing">
          <div className="view">
            <input className="toggle" type="checkbox" />
            <label>Offrir du saucisson au prof</label>
            <button className="destroy" />
          </div>
          <form>
            <input className="edit" defaultValue="Offrir du saucisson au prof" />
            <input type="submit" value="Valider" className="hidden" />
          </form>
        </li>
      </ul>
    </section>
    {/* Ce footer doit être caché par défaut et affichée quand il y a des todos */}
    <footer className="footer">
      {/* Ceci devrait être "0 restants" par défaut */}
      <span className="todo-count">
        <strong>
          2
        </strong> tâches restantes
      </span>
      <ul className="filters">
        <li>
          <button className="selected">
            Tous
          </button>
        </li>
        <li>
          <button>
            Actifs
          </button>
        </li>
        <li>
          <button>
            Complétés
          </button>
        </li>
      </ul>
      {/* Caché si aucun élément complété restant */}
      <button className="clear-completed">
        Effacer les complétés
      </button>
    </footer>
  </section>
}

export default App

