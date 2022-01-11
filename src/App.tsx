// #auth-context
import {
  AuthContextProvider,
  LocationService,
  loadGlobalConfig
} from '@tmtsoftware/esw-ts'
// #auth-context
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Main } from './components/Main'
import { AppConfig } from './config/AppConfig'
import { LocationServiceProvider } from './contexts/LocationServiceContext'
import { useQuery } from './hooks/useQuery'

const basename = import.meta.env.PROD ? AppConfig.applicationName : ''
//#auth-context
const App = (): JSX.Element => {
  // ..
  // ..
  const { error, data: initialised } = useQuery(() =>
    loadGlobalConfig().then(() => true)
  )
  //#auth-context
  const locationService = LocationService()

  if (error) return <div> Failed to load global config </div>
  //#auth-context
  return initialised ? (
    <div>
      <LocationServiceProvider locationService={locationService}>
        <Router basename={basename}>
          <AuthContextProvider>
            <Main />
          </AuthContextProvider>
        </Router>
      </LocationServiceProvider>
    </div>
  ) : (
    <div>Loading...</div>
  )
}
//#auth-context
export default App
