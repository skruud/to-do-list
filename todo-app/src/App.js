import React, { Component } from 'react';
import { BrowserRouter as Router,  Route} from 'react-router-dom';
import Todolist from './components/Todolist';
import Header from './components/layout/Header';
import AddTodoItem from './components/AddTodoItem';
import About from './components/pages/About';
//import { v4 as uuidv4 } from 'uuid';

import './App.css';
import axios from 'axios';
//import {API} from 'aws-amplify';

class App extends Component {
  state = {
    todolist: []
  }

  componentDidMount() {
    axios
      .get('https://6zm55pojjf.execute-api.eu-north-1.amazonaws.com/dev/todos')
      .then(res => this.setState(
        { todolist:  (res.data)  },
        console.log( (res.data) )
        ));
  }

  changeCompletion = (id) => {
    axios
      .put(`https://6zm55pojjf.execute-api.eu-north-1.amazonaws.com/dev/todos/${id}`, {complete: true})
      .then(res => 
        this.setState(
          { todolist: this.state.todolist.map(todoItem => {
            if (todoItem.id === id) {
              todoItem.completed = !todoItem.completed;
            }
            return todoItem;
          })
        }));
    
  };

  deleteTodoItem = (id) => {
    axios
      .delete(`https://6zm55pojjf.execute-api.eu-north-1.amazonaws.com/dev/todos/${id}`)
      .then(res => 
        this.setState(
          { todolist: this.state.todolist.filter(todoItem => todoItem.id !== id) },
          console.log(res)
          ) 
      );
  };

  addTodoItem = (title) => {
    console.log(title)
    axios
      .post('https://6zm55pojjf.execute-api.eu-north-1.amazonaws.com/dev/todos', {title: title })
      .then(res => 
        this.setState(
          { todolist: [...this.state.todolist, res.data ] },
          console.log(res.data)
          ) );
    
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodoItem addTodoItem={this.addTodoItem} />
                <Todolist todolist={this.state.todolist} changeCompletion={this.changeCompletion} deleteTodoItem={this.deleteTodoItem}/>
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}


export default App;
