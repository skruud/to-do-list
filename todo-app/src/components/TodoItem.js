import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class TodoItem extends Component {

  getStyle = () => {
    return {
      background: '#f2f2f2',
      padding: '5px',
      borderBottom: '2px #bbb dotted',
      textDecoration: this.props.todoItem.complete ?
      'line-through' : 'none'
    }
  }

  render() {
    const { title, id, complete } = this.props.todoItem;
    return (
      <div style={this.getStyle()}>
        <p>
          <input type="checkbox" defaultChecked={complete} onChange={this.props.changeCompletion.bind(this, id)} /> {" "}
          { title }
          <button onClick={this.props.deleteTodoItem.bind(this, id)} style={buttonStyle}>X</button>
        </p>
      </div>
    )
  }
}

const buttonStyle = {
  background: '#ff0f00',
  color: '#fff',
  padding: '5px 10px',
  border: 'none',
  borderRadius: '75%',
  cursor: 'pointer',
  float: 'right'
}



TodoItem.propTypes = {
    todoItem: PropTypes.object.isRequired,
    changeCompletion: PropTypes.func.isRequired,
    deleteTodoItem: PropTypes.func.isRequired
}

export default TodoItem
