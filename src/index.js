import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'mobx-react';
import authStore from './stores/authStore'
import permissionStore from './stores/permissionStore'



const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <Provider authStore={authStore} permissionStore={permissionStore}>
    <App />
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
