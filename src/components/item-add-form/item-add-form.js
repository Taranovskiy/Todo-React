import React, { Component } from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {
  state = {
    value: '',
  };
  onChangeInput = evt => {
    this.setState({ value: evt.target.value });
  };
  onSubmit = evt => {
    evt.preventDefault();
    const { onAdded } = this.props;
    const { value } = this.state;
    onAdded(value);
    this.setState({ value: '' });
  };
  render() {
    return (
      <form
        className='add-todo d-flex justify-content-between align-items-end'
        onSubmit={this.onSubmit}
      >
        <input
          type='text'
          placeholder='New task'
          className='form-control mr-2'
          onChange={this.onChangeInput}
          value={this.state.value}
        />
        <button type='submit' className='btn btn-outline-primary mt-2'>
          Add
        </button>
      </form>
    );
  }
}
