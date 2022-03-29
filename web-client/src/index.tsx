import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import axios from "axios";
import {RecoilRoot} from "recoil";
import RecoilNexus from "recoil-nexus";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers!['Authorization'] = `Bearer ${token}`;
        }
        config.headers!["Content-Type"] = "application/json";
        return config;
    },
    error => Promise.reject(error)
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <RecoilRoot>
            <RecoilNexus />
            <App />
        </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
