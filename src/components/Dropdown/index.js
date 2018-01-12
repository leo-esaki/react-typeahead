import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DropdownMenu, DropdownItem } from 'reactstrap';
import './style.css';

class Dropdown extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
    options: PropTypes.array,
  };

  static childContextTypes = {
    dropup: PropTypes.bool,
    isOpen: PropTypes.bool,
    toggle: PropTypes.func
  };

  getChildContext() {
    const { isOpen } = this.props;
    return {
      dropup: false,
      isOpen,
      toggle: () => {}
    };
  }

  render() {
    const { onChange, options, isOpen, value } = this.props;

    return options && options.length > 0 ? (
      <DropdownMenu className={cn('t-dropdown', { 't-dropdown--open': isOpen })}>
        {options.map((item, index) => (
          <DropdownItem
            key={index}
            tag='div'
            onClick={function() { onChange && onChange(item.name); }}
            active={item.name === value}
            className="t-dropdown__item"
          >
            <div className="t-dropdown__item-title">{item.name}</div>
            <div className="t-dropdown__item-desc" dangerouslySetInnerHTML={{ __html: item.short_description }} />
          </DropdownItem>
        ))}
      </DropdownMenu>
    ) : false;
  }
}

export default Dropdown;
