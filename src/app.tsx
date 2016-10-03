import './styles/main.scss'
import * as React from 'react'
import { render } from 'react-dom'

import { LongPage } from './components/LongPage'

const container = document.querySelector('#root')

render(<LongPage />, container)
