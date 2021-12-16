import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login.js';
import Dashboard from './Dashboard';
import queryString from 'query-string';
import './index.css';

var parsedCode = queryString.parse(window.location.hash);
var code = queryString.stringify(parsedCode).split('&')[0].split('=')[1];

function Exportify() {
  return (
    <>
      <div className="app">
        <h1 className="main-logo">Exportify</h1>
        <h1 className="main-desc">
          Export your Spotify playlists as JSON/text
        </h1>
        {code ? <Dashboard code={code} /> : <Login />}
      </div>

      <footer>
        <a href="https://kaushikkarthik.dev">
          <h4 style={{ color: 'black' }}>kaushikkarthik.dev</h4>
        </a>
      </footer>
    </>
  );
}

ReactDOM.render(<Exportify />, document.getElementById('root'));
