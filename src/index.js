import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ToDo from './Components/ToDo';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<ToDo />, document.getElementById('root'));

serviceWorker.unregister();
