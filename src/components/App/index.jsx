import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import Navbar from '../Header.js';
import Footer from '../Footer';
import Form from '../Article/Form/'
import { Home } from '../../components';

const App = (props) => {
  return (    
    <div>  
      <Navbar/>    
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/addblog" component={Form} />
      </Switch>
      <Footer/>
    </div>

  )
}

export default withRouter(App);