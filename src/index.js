import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import SignIn from './components/session/signin';
import SignOut from './components/session/signout';
import Products from './components/products';
import Registration from './components/registration';
// import Home from './components/home';
import Header from './pages/header';
import store from './store';

import { alertError } from './pages/alert';

import registerServiceWorker from './registerServiceWorker';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Products} />
          <SignOutRoute path="/signout" component={SignOut} />
          <PrivateRoute path="/signup" component={Registration} />
          <PrivateRoute path="/signin" component={SignIn} />
          <Route render={() => <h1>not found</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

const sessionToken = localStorage.getItem('sessionToken');
const rootRedirect = () => {
  alertError('User has already signed in.');
  return <Redirect to="/" />;
}


const SignOutRoute = ({component: Component, ...rest}) => {
  console.log("SignOutRoute")
  return <Route
    {...rest}
    render={
      (props) => sessionToken ? (<Component  {...props}/>) : rootRedirect()
    }
  />
}

const PrivateRoute = ({component: Component, ...rest}) => {
  console.log(...rest)
  return <Route
    {...rest}
    render={
      (props) => sessionToken ? rootRedirect() : (<Component  {...props}/>)
    }
  />
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
