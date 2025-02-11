import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 
import  {MyProvider}  from './components/mycontext/Mycontext.jsx'; 
ReactDOM.render(
    <MyProvider>
        <App />
    </MyProvider>,
    document.getElementById('root')
);
