//#auth
import * as React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Login } from './Login'
//#auth
import { SubmitCommand } from './SubmitCommand'
import { SubscribeEvent } from './SubscribeEvent'
// #auth
//#submit-command
export const Main = (): JSX.Element => {
  const { auth } = useAuth()
  if (!auth) return <div>Loading</div>
  const isAuthenticated = auth?.isAuthenticated() ?? false

  return isAuthenticated ? (
    <div
      style={{
        display: 'flex',
        placeContent: 'space-around',
        paddingTop: '2rem'
      }}>
      {/* // #auth */}
      <SubmitCommand />
      {/* //#submit-command */}
      <SubscribeEvent />
      {/* //#submit-command */}
    </div>
  ) : (
    <Login />
  )
}
// #submit-command

// added for paradox
export const Main2 = (): JSX.Element => {
  const { auth } = useAuth()
  if (!auth) return <div>Loading</div>
  const isAuthenticated = auth?.isAuthenticated() ?? false

  return isAuthenticated ? (
    <div
      style={{
        display: 'flex',
        placeContent: 'space-around',
        paddingTop: '2rem'
      }}>
      {/* // #auth */}
      Hello world
    </div>
  ) : (
    <Login /> //<-- By adding this component, redirects user to keycloak page when he is not logged in.
  )
}
// #auth
