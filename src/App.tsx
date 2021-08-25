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

const App: FC = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/home' exact component={Home}></Route>
          <Route path='/about' exact component={About}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/test' exact component={Test}></Route>
          <Redirect to="/home" from='/' exact /> 
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
