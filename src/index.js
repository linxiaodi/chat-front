import 'normalize.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

window.localStorage.setItem('robotMsg', '[]')

ReactDOM.render(<App />, document.getElementById('root'))
