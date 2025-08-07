import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [num, setNum] = useState(0);
  const [total, setTotal] = useState(0);
  const calc = () => {
    let result = 0;
    for (let i = 0; i < num; i++) {
      result += i;
    }
    setTotal(result);
  }

  return (
    <div className="App">
      <h1>React Sample</h1>
      <header className="container">
        <div className='card'>
          <h3>合計を算出</h3>
          <h4>合計: {total}</h4>
          <input type="number" value={num} onChange={(e) => setNum(e.target.value)} />
          <button onClick={calc}>計算</button>
        </div>
      </header>
    </div>
  );
}

export default App;
