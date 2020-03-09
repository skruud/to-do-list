import React, { Component } from 'react';
import { BrowserRouter as Router,  Route} from 'react-router-dom';
import Todolist from './components/Todolist';
import Header from './components/layout/Header';
import AddTodoItem from './components/AddTodoItem';
import About from './components/pages/About';
//import { v4 as uuidv4 } from 'uuid';

import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    todolist: []
  }

  componentDidMount() {
    axios
      .get('https://3x6d27ojt7.execute-api.us-east-1.amazonaws.com/default')
      .then(res => this.setState({ todolist: res.data }));
  }

  changeCompletion = (id) => {
    this.setState({ 
      todolist: this.state.todolist.map(todoItem => {
        if (todoItem.id === id) {
          todoItem.completed = !todoItem.completed;
        }
        return todoItem;
      })
    });
  };

  deleteTodoItem = (id) => {
    axios
      .delete(`https://3x6d27ojt7.execute-api.us-east-1.amazonaws.com/default`)
      .then(res => 
        this.setState({ todolist: [...this.state.todolist.filter(todoItem => todoItem.id !== id)] }) 
      );
  };

  addTodoItem = (title) => {
    axios
      .post('https://3x6d27ojt7.execute-api.us-east-1.amazonaws.com/default', {title: title, completed: false })
      .then(res => 
        this.setState({ todolist: [...this.state.todolist, res.data] }) );
    
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
