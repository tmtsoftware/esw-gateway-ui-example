//#auth
import * as React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Login } from './Login'
//#auth
import { SubmitCommand } from './SubmitCommand'
// #subscribe-event
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
//#subscribe-event
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
    <Login /> // <- add this line
  )
}
// #auth
