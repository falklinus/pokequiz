import React from 'react';
import './App.css';

import Quiz from './Quiz/Quiz';

const App = () => {
  return (
    <div className='App'>
      <p className='App-title'>PokeQuiz</p>
      <Quiz />
    </div>
  );
};

export default App;
