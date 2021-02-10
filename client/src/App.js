
import React, { Component } from 'react';

import Router from './components/Router'
import runtimeEnv from '@mars/heroku-js-runtime-env';


class  App extends Component {
  render() {  
    const env = runtimeEnv();

    return( 
      <React.Fragment>   
       
     
     <Router >
     <code>Runtime env var example: { env.REACT_APP_HELLO }</code>
     </Router>
      
  
      </React.Fragment>
    );
 };
}

export default App;
