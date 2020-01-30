import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import Quiz from './Quiz/Quiz';
import Practise from './Practise/Practise';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Route exact path='/' component={Quiz} />
        <Route path='/practise' component={Practise} />
      </div>
    </Router>
  );
};

export default App;
