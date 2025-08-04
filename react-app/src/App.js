import logo from './logo.svg';
import './App.css';

function Title(props)  {
  return <h1>{props.content}</h1>;
}

function Message(props) {
  return <p>{props.content}</p>;
}

function Alert(props) {
  return (
    <div className='alert'>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
    </div>
  )
}

function Card(props) {
  return (
    <div className='card'>
      <Title content={props.title} />
      <Message content={props.content} />
    </div>
  )
}

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const flag = queryParams.get('flag') === 'true'; // trueならアラート、falseならカードを表示

  return (
    <div className="App">
      <h1>React Sample</h1>
      <header className="container">
        { flag ?
          <Alert title="アラート" content="1つ目のメッセージ"/>
          :
          <Card title="カード" content="別のメッセージを表示"/>
        }
      </header>
    </div>
  );
}

export default App;
