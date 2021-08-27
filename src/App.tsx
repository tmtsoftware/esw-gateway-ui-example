import { AuthContextProvider, LocationService } from '@tmtsoftware/esw-ts'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Main } from './components/Main'
import { AppConfig } from './config/AppConfig'
import { LocationServiceProvider } from './contexts/LocationServiceContext'
import { useQuery } from './hooks/useQuery'

const basename =
  import.meta.env.NODE_ENV === 'production' ? AppConfig.applicationName : ''

const App = (): JSX.Element => {
  const { data: locationService, loading, error } = useQuery(LocationService)

  if (loading) return <div>Loading...</div>
  if (error || !locationService)
    return <div>Location Service not Available, reason {error?.message}</div>

  return (
    <div>
      <LocationServiceProvider locationService={locationService}>
        <AuthContextProvider>
          <Router basename={basename}>
            <Main />
          </Router>
        </AuthContextProvider>
      </LocationServiceProvider>
    </div>
  )
}

export default App
