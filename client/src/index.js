import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import './index.css'
// import reportWebVitals from './reportWebVitals';
//for body
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>
  ,
  document.getElementById('root')
);
//for headers
// ReactDOM.render(
//   <title>hi</title>,
//   document.getElementById('head')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
