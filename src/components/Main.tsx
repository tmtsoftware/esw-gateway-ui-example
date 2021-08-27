import * as React from 'react'
import { useAuth } from '../hooks/useAuth'
import { PublishEvent } from './PublishEvent'
import { RedirectToLogin } from './RedirectToLogin'
import { SubmitCommand } from './SubmitCommand'

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
      <PublishEvent />
    </div>
  ) : (
    <RedirectToLogin />
  )
}
