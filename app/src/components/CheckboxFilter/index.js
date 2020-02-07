import React from 'react';
import PropTypes from 'prop-types';
import _upperCase from 'lodash/upperCase';

import './index.scss';

class CheckboxFilter extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
    })),
    onSelect: PropTypes.func.isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.number),
    clearAll: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedIds: [],
  };

  render() {
    return (
      <div className="checkbox-filter">
        <section className="checkbox-filter__header">
          <div className="checkbox-filter__header-title">{_upperCase(this.props.title)}</div>
          <button className="checkbox-filter__clear-button btn-text-primary" onClick={this.props.clearAll}>Clear</button>
        </section>
        <ul className="checkbox-filter__ul">
          {this.props.fields.map(field => (
            <li key={field.id}>
              <input
                className="checkbox-filter__checkbox"
                id={`${this.props.title.replace(' ', '')}-styled-checkbox-${field.id}`}
                type="checkbox" checked={this.props.selectedIds.indexOf(field.id) >= 0}
                onChange={() => this.props.onSelect({ id: field.id })}
              />
              <label htmlFor={`${this.props.title.replace(' ', '')}-styled-checkbox-${field.id}`}> {field.value}</label>
            </li>
          ))}
        </ul>
        <hr />
      </div>
    );
  }
}

export default CheckboxFilter;
