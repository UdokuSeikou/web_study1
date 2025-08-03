import logo from './logo.svg';
import './App.css';

function Title(props)  {
  return <h1>{props.content}</h1>;
}

function Message(props) {
  return <p>{props.content}</p>;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Title content="タイトルです"/>
        <Message content="1つ目のメッセージ"/>
        <Message content="別のメッセージ"/>
      </header>
    </div>
  );
}

export default App;
