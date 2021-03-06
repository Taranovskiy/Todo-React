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
    term: '',
    filter: 'all',
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
      this.toggleStateProp(todoData, id, 'important'),
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

  setTerm = term => this.setState({ term });

  filterTodoItem = name => this.setState({ filter: name });

  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter(item =>
      item.label.toLowerCase().includes(term.toLowerCase()),
    );
  };

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'done':
        return items.filter(item => item.done);
      case 'active':
        return items.filter(item => !item.done);
      default:
        return items;
    }
  }

  render() {
    const { todoData, term, filter } = this.state;
    const doneCount = todoData.filter(todo => todo.done).length;
    const todoCount = todoData.length - doneCount;
    const visibleTodoData = this.filter(this.search(todoData, term), filter);

    return (
      <div className='todo-app'>
        <AppHeader toDo={ todoCount } done={ doneCount } />
        <div className='top-panel d-flex'>
          <SearchPanel onChangeSearchFiled={ this.setTerm } />
          <ItemStatusFilter filter={filter} onClickFilterItem={ this.filterTodoItem } />
        </div>

        <TodoList
          todos={ visibleTodoData }
          onDeleted={ this.deleteTodo }
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone }
        />
        <ItemAddForm onAdded={ this.addTodo } />
      </div>
    );
  }
}
