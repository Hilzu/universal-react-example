import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import routes from '../routes'
import { DataRoot, loadInitialForBrowser } from '../InitialDataLoad'

const initialData = loadInitialForBrowser()

ReactDOM.render(
  <DataRoot initialData={initialData} component={Router} history={createBrowserHistory()} routes={routes} />,
  document.getElementById('content')
)
