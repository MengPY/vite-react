import React, { useState, FC } from 'react'
import {NavLink,withRouter,HashRouter, Route, BrowserRouter, Redirect, Link, Switch} from 'react-router-dom';
import { renderRoutes} from 'react-router-config';
import './App.css'
import 'antd/dist/antd.css';
import routes from './routes';
import Home from './views/home'
import About from './views/about'
import Login from './views/login'
import Test from './views/test'
import TreeDemo from './views/tree'

const App: FC = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path='/home' exact component={Home}></Route>
          <Route path='/about' exact component={About}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/test' exact component={Test}></Route>
          <Route path='/tree' exact component={TreeDemo}></Route>
          <Redirect to="/home" from='/' exact /> 
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App;
