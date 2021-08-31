import * as React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Login } from './Login'
import { SubmitCommand } from './SubmitCommand'
import { SubscribeEvent } from './SubscribeEvent'

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
      <SubmitCommand />
      <SubscribeEvent />
    </div>
  ) : (
    <Login />
  )
}
