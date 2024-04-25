import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import Register from './views/register'
import Confirmation from './views/confirmation'
import SignIn from './views/sign-in'
import About from './views/about'
import Home from './views/home'
import Dashboard from './views/dashboard'
import NotFound from './views/not-found'
//import chatGPT_plaid from './views/chatGPT_plaid'
//<Route component={chatGPT_plaid} exact path="/chatGPT_plaid" />

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Register} exact path="/register" />
        <Route component={Confirmation} exact path="/confirmation" />
        <Route component={SignIn} exact path="/sign-in" />
        <Route component={About} exact path="/about" />
        <Route component={Dashboard} exact path="/dashboard" />
        <Route component={Home} exact path="/Profiteer" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
