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
  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.map(todo => {
        if (todo.id === id) {
          return { ...todo, important: !todo.important };
        }
        return todo;
      });
      return { todoData: newTodoData };
    });
  };
  onToggleDone = id => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.map(todo => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });
      return { todoData: newTodoData };
    });
  };
  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }
  render() {
    return (
      <div className='todo-app'>
        <AppHeader toDo={1} done={3} />
        <div className='top-panel d-flex'>
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={this.state.todoData}
          onDeleted={this.deleteTodo}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onAdded={this.addTodo} />
      </div>
    );
  }
}
