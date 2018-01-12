import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

import Dropdown from '../Dropdown';
import Tooltip from '../Tooltip';
import { funcsList, getContext, filterList } from 'helpers/typeahead.js';
import './style.css';

const getDropdownStatus = (context, options) =>
  options.length > 0 && context.type !== 'end';

const getTooltipStatus = (context) =>
  context && context.type === 'delimiter';

class FormulaEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      context: null,
      dropdownOpen: false,
      tooltipOpen: true,
      options: funcsList,
      funcName: null,
      selectedName: null,
    };
    window.addEventListener('click', this.resetPopupsOpen);
  }

  handleValueChange = (e) => { // handles the input value changed with focus.
    const { onChange } = this.props;
    const { value } = e.target;
    const context = getContext(value, e.target.selectionStart);
    const options = filterList(context);
    const dropdownOpen = getDropdownStatus(context, options);
    const tooltipOpen = getTooltipStatus(context);
    const funcName = context.type === 'func' && options.length > 0
      ? options[0].name
      : this.state.funcName;
    this.setState({
      context,
      options,
      dropdownOpen,
      tooltipOpen,
      funcName
    });

    onChange(e.target.value);
  }

  toggleDropdownOpen = () => {
    this.setState({
      dropdownOpen: this.state.dropdownOpen
    });
  }

  handleInputFocus = () => {
    const { value } = this.props;
    const context = getContext(value, value.length);
    const options = filterList(context);
    const dropdownOpen = getDropdownStatus(context, options);
    const tooltipOpen = getTooltipStatus(context);
    this.setState({
      dropdownOpen,
      tooltipOpen,
      options
    });
  }

  resetPopupsOpen = (e) => {
    e.stopPropagation();
    this.setState({
      dropdownOpen: false,
      tooltipOpen: false
    });
  }

  handleClick = (e) => {
    e.stopPropagation();
  }

  handleItemChange = (itemName) => {
    this._input.focus();
    this.setState({
      selectedName: itemName,
    });
    this.updateValueWithSelected(itemName);
  }

  // Update formula with selected function name or field name from dropdown
  updateValueWithSelected = (selectedName) => {
    const { value, onChange } = this.props;
    const { context } = this.state;
    const funcName = (!context || context.type === 'func') ? selectedName : this.state.funcName;
    this.setState({
      dropdownOpen: false,
      tooltipOpen: true,
      funcName
    });
    const newValue = context
      ? value.slice(0, context.startPos) + selectedName
      : selectedName;
    onChange(newValue);
  }

  handleKeyDown = (e) => {
    const { context, dropdownOpen, options, selectedName } = this.state;
    if (e.keyCode === 38) { // Key Up
      const idx = findIndex(options, { name: selectedName });
      const newIdx = ((idx < 0 ? 0 : idx) - 1 + options.length) % ( options.length || 1);
      e.preventDefault();
      this.setState({
        selectedName: options[newIdx].name
      })
    } else if (e.keyCode === 40) { // Key Down
      const idx = findIndex(options, { name: selectedName });
      const newIdx = ((idx < 0 ? -1 : idx) + 1) % ( options.length || 1);
      e.preventDefault();
      this.setState({
        selectedName: options[newIdx].name
      })
    } else if (e.keyCode === 13 && dropdownOpen) { // Key Enter
      let newSelectedName = selectedName;
      if (!selectedName && options.length > 0) {
        newSelectedName = options[0].name;
      }
      if (newSelectedName) {
        this.updateValueWithSelected(newSelectedName);
      }
    }
  }

  togglePopover = () => {
    this.setState({
      tooltipOpen: false
    });
  }

  render() {
    const { value } = this.props;
    const { options, dropdownOpen, tooltipOpen, funcName, selectedName } = this.state;
    const selectedFunc = find(funcsList, { name: funcName });

    return (
      <div className="formula-editor" onClick={this.handleClick}>
        <Input
          onChange={this.handleValueChange}
          onFocus={this.handleInputFocus}
          onKeyDown={this.handleKeyDown}
          getRef={(input) => this._input = input}
          value={value}
        />
        {selectedFunc &&
          <Tooltip show={tooltipOpen} text={selectedFunc.description} />
        }
        <Dropdown
          value={selectedName}
          isOpen={dropdownOpen}
          options={options}
          onChange={this.handleItemChange}
        />

      </div>
    )
  }
}

export default FormulaEditor;
