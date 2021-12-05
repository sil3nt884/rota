import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


ReactDOM.render(<App/>, document.getElementById('app'));


serviceWorkerRegistration.register();

