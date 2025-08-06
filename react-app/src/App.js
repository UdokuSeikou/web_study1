import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount(count + 1);
  }
  const countInit = () => {
    setCount(0);
  }

  return (
    <div className="App">
      <h1>React Sample</h1>
      <header className="container">
        <div className='card'>
          <h3>数字をカウント</h3>
          <p>{"count: "+count}</p>
          <button onClick={countUp}>Count</button>
          <button onClick={countInit}>Reset</button>
        </div>
      </header>
    </div>
  );
}

export default App;
