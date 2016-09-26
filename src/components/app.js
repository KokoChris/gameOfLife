import React, { Component } from 'react';
import Tile  from './tile';
import Board from './board';

export default class App extends Component {
  render() {
    return (
      <div className="container">
          <Board />

          <a href="https://github.com/KokoChris/gameOfLife">Github</a>
      </div>

    );
  }
}
