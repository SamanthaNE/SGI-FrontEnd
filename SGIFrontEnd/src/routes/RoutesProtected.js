import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const RoutesProtected = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    isAuth ? <Outlet /> : <Navigate to='/' />
  )
}

export default RoutesProtected