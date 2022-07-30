// import logo from './logo.svg';

import Timer from './components/timer/Timer';
import ZenScribe from './components/zenScribe/ZenScribe';
import GithubUserInfo from './components/githubUserInfo/GithubUserInfo';
import CardDeck from './components/cardDeck/CardDeck';
import JokeList from './components/jokeList/JokeList';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      {/* <Timer />
      <ZenScribe />
      <GithubUserInfo username='facebook'/>
      <GithubUserInfo username='google'/>
      <GithubUserInfo username='microsoft'/>
      <GithubUserInfo username='jas112'/> */}

      {/* <CardDeck /> */}
      <JokeList />
    </div>
  );
}

export default App;
