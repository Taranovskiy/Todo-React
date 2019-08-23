import React, { Component } from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {
  state = {
    label: 'Add new item'
  }
  onClick = () => {
    const { label } = this.state;
    const { onAdded } = this.props;
    return onAdded(label);
  }
  render() {
    const { label } = this.state;
    return (
      <div className="add-todo d-flex justify-content-between align-items-center">
        <span className='todo-list-item-label'>New todo</span>
        <button
          type='button'
          className='btn btn-sm btn-outline-primary mt-2'
          onClick={ this.onClick }
        >
          { label }
        </button>
      </div>
    );
  }
};
