import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddTodoItem extends Component {

  state = {
    title: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTodoItem(this.state.title);
    this.setState({ title: '' });
  }

  onTextChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
        <input type="text" name="title" style={{flex: '10', padding: '5px' }} 
        placeholder="Add item..." value={this.state.title} onChange={this.onTextChange}/>
        <input type="submit" value="Submit" className="button" style={{flex: '1'}} />
      </form>
    )
  }
}

AddTodoItem.propTypes = {
  addTodoItem: PropTypes.func.isRequired
}

export default AddTodoItem
