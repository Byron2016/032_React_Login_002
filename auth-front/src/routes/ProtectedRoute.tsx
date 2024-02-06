// ProtectedRoute
// import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export default function ProtectedRoute() {
  // const [isAuth, setIsAuth] = useState(false)
  const auth = useAuth()

  // return isAuth ? <Outlet /> : <Navigate to="/" />
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />
}
