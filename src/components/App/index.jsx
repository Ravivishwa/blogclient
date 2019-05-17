import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import Navbar from '../Header/index.js';
import Footer from '../Footer';
import Form from '../Article/Form/'
import { Home } from '../../components';

const App = (props) => {
  return (    
    <React.Fragment>  
      <Navbar/>    
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/addblog" component={Form} />
      </Switch>
    </React.Fragment>

  )
}

export default withRouter(App);