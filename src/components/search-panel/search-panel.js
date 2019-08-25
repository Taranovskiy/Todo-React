import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
  state = {
    term: '',
  };

  onChangeSearchFiled = ({ target: { value } }) => {
    this.setState({ term: value });
    this.props.onChangeSearchFiled(value);
  };

  render() {
    return (
      <input
        type='text'
        className='form-control search-input'
        placeholder='type to search'
        value={this.state.term}
        onChange={this.onChangeSearchFiled}
      />
    );
  }
}
