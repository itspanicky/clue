import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Lobby from './pages/Lobby'
import Header from './components/Header'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
import { playerId } from './services/localStorage'

function App() {
  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    // fetch user id from local storage and save to state
    if (!user) {
      const _user = playerId()
      console.log("user", _user)
      dispatch({
        type: actionTypes.SET_USER,
        user: _user,
      })
    }
  }, [user, dispatch])

  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path='/:roomCode/Lobby' component={Lobby} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    </div>
  )
}

export default App