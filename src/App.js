import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Lobby from './pages/Lobby'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/:roomCode/Lobby' component={Lobby} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;