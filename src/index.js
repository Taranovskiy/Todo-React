import React from 'react';
import ReactDom from 'react-dom';

import AppHeader from './components/app-header';
import SearchPanel from './components/search-panel';
import TodoList from './components/todo-list';

const App = () => {
  const todoData = [
    { id: 1, label: 'Drink coffee', important: false },
    { id: 2, label: 'Make awesome app', important: true },
    { id: 3, label: 'Have a lunch', important: false },
  ];

  return (
    <div>
      <AppHeader />
      <SearchPanel />
      <TodoList todos={ todoData }/>
    </div>
  );
};

ReactDom.render(<App/>, document.getElementById('root'));
