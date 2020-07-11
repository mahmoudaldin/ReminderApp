import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App'
import 'bootstrap/dist/css/bootstrap.min.css';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import reminders from './reducers/index';
import './index.css'
 
const store = createStore(reminders, {}, applyMiddleware(reduxThunk));
ReactDom.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById(`root`)
)