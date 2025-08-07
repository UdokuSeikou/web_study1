import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({
    title: '初期タイトル',
    message: '初期メッセージ'
  });
    
  const fetchData = async () => {
    const response = await fetch('api');
    const json = await response.json();
    setData(json);
  }

  return (
    <div className='App'>
      <h1>{data.title}</h1>
      <p>{data.message}</p>
      <button onClick={fetchData}>データ取得</button>
    </div>
  );

}

export default App;
