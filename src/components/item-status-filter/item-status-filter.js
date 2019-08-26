import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  buttons = [
    { name: 'all', label: 'All', isActive: true },
    { name: 'active', label: 'Active', isActive: false },
    { name: 'done', label: 'Done', isActive: false },
  ];

  render() {
    const { filter } = this.props;
    const buttons = this.buttons.map(item => {
      const isActive = item.name === filter;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button
          type='button'
          className={`btn ${clazz}`}
          onClick={ () => this.props.onClickFilterItem(item.name) }
          key={ item.name }>
          { item.label }
        </button>
      );
    });
    return (
      <div className='btn-group'>
        { buttons }
      </div>
    );
  }
}
