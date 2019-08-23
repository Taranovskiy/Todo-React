import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
  state = {
    todoData : [
      { label: 'Drink Coffee', important: false, id: 1 },
      { label: 'Make Awesome App', important: true, id: 2 },
      { label: 'Have a lunch', important: false, id: 3 },
    ]
  }
  maxId = 100
  deleteTodo = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter(todo => todo.id !== id);
      return { todoData: newTodoData };
    });
  }
  addTodo = (name) => {
    const newTodoDataItem = {
      label: name,
      important: false,
      id: this.maxId++
    };
    this.setState(({ todoData }) => ({ todoData: [ ...todoData, newTodoDataItem ]}));
  }
  render() {
    return (
      <div className='todo-app'>
        <AppHeader toDo={1} done={3} />
        <div className='top-panel d-flex'>
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList todos={this.state.todoData} onDeleted={this.deleteTodo} />
        <ItemAddForm onAdded={this.addTodo}/>
      </div>
    );
  }
};
