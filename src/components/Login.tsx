// #login-page
import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

export const Login = (): React.JSX.Element => {
  const { login } = useAuth()

  useEffect(login, [login])

  return <div>Loading...</div>
}
// #login-page
