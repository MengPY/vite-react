import { RouteConfig } from 'react-router-config'
import Home from './../views/home'
const routesConfig: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  // hybird 路由
  {
    path: '/home',
    exact: true,
    component: Home,
   
  },
]
export default routesConfig