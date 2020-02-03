import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import ToDoS from './components/ToDoS';

const App = () => {
  return (
    <div>
      <Header> </Header>
      <Router>
        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/todo" component={ToDoS} />
          </div>
        </Router>
      </Router>
    </div>
  );
}

export default App;
