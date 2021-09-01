// #auth-context
import { AuthContextProvider, LocationService } from '@tmtsoftware/esw-ts'
// #auth-context
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Main } from './components/Main'
import { AppConfig } from './config/AppConfig'
import { LocationServiceProvider } from './contexts/LocationServiceContext'
import { useQuery } from './hooks/useQuery'

const basename =
  import.meta.env.NODE_ENV === 'production' ? AppConfig.applicationName : ''
//#auth-context
const App = (): JSX.Element => {
  // ..
  // ..
  //#auth-context
  const { data: locationService, loading, error } = useQuery(LocationService)

  if (loading) return <div>Loading...</div>
  if (error || !locationService)
    return <div>Location Service not Available, reason {error?.message}</div>
  //#auth-context
  return (
    <div>
      <LocationServiceProvider locationService={locationService}>
        <Router basename={basename}>
          <AuthContextProvider>
            <Main />
          </AuthContextProvider>
        </Router>
      </LocationServiceProvider>
    </div>
  )
}
//#auth-context
export default App
