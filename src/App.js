import React from 'react';

import TrackContainer from './containers/TrackContainer';


function App() {
  return (
    <div className="app">
      <header>
        <h1>Currency Tracker</h1>
        <p className="subtitle">
          We track currencies price and notify you when it matches your expectation.<br />
          This project was built with <strong>Koa</strong>, <strong>GraphQL</strong> and <strong>MongoDB</strong><br />
          Developed by <a href="https://github.com/fill-lima" target="_blank" rel="noopener noreferrer">Felipe Lima</a>
        </p>
      </header>
      <TrackContainer />
    </div>
  );
}

export default App;
