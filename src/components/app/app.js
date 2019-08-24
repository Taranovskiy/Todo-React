import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
  maxId = 100;
  state = {
    todoData: [
      this.createTodoItem('Drink coffee'),
      this.createTodoItem('Make awesome app'),
      this.createTodoItem('Have a lunch'),
    ],
  };
  deleteTodo = id => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter(todo => todo.id !== id);
      return { todoData: newTodoData };
    });
  };
  addTodo = name => {
    const newTodoDataItem = this.createTodoItem(name);
    this.setState(({ todoData }) => ({
      todoData: [...todoData, newTodoDataItem],
    }));
  };
  toggleStateProp = (arr, id, propName) => {
    const newStateProp = arr.map(todo => {
      if (todo.id === id) {
        return { ...todo, [propName]: !todo[propName] };
      }
      return todo;
    });
    return { todoData: newStateProp };
  };

  onToggleImportant = id =>
    this.setState(({ todoData }) =>
      this.toggleStateProp(todoData, id, 'important')
    );
  onToggleDone = id =>
    this.setState(({ todoData }) => this.toggleStateProp(todoData, id, 'done'));

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }
  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter(todo => todo.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className='todo-app'>
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className='top-panel d-flex'>
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={todoData}
          onDeleted={this.deleteTodo}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onAdded={this.addTodo} />
      </div>
    );
  }
}
