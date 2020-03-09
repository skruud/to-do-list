import React, { Component } from 'react'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'

export class Todolist extends Component {

  render() {
    return this.props.todolist.map((todoItem) => (
      <TodoItem 
        key={todoItem.id} todoItem={todoItem} 
        changeCompletion={this.props.changeCompletion} 
        deleteTodoItem={this.props.deleteTodoItem} 
      />
    ));
  }
}

Todolist.propTypes = {
    todolist: PropTypes.array.isRequired,
    changeCompletion: PropTypes.func.isRequired,
    deleteTodoItem: PropTypes.func.isRequired
}

export default Todolist
