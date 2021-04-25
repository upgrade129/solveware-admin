import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Addproduct from './components/Addproduct';
import Customerdetails from './components/Customerdetails';
import Orderdetails from './components/Orderdetails';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/customerdetails">
            <Customerdetails />
          </Route>
          <Route path="/orderdetails">
            <Orderdetails />
          </Route>
          <Route path="/addproduct">
            <Addproduct />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
