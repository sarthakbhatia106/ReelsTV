import logo from './logo.svg';
import './App.css';
import SignUp from './Components/SignUp';
import AuthProvider from './Context/AuthProvider';
import NavBar from './Components/NavBar';
import Ioa from './Components/Ioa';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Feeds from './Components/Feeds';
import LogIn from './Components/LogIn';
import Profile from './Components/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Feeds}/>
          <Route path='/login' component={LogIn}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/profile' component={Profile}/>
        </Switch>
      </AuthProvider>
    </Router>
    // <Ioa/>
  );
}

export default App;
