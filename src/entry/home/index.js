import React from 'react'
import ReactDOM from 'react-dom'
import { parseQueryString } from 'UTIL'

const query = parseQueryString()

ReactDOM.render(<TimelinePage id={query.id} />, document.getElementById('root'))