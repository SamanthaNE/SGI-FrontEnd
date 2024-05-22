import React, { Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { UserProvider } from './context/UserContext';
import { CSpinner } from '@coreui/react'
import './scss/style.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./features/login/Login'))

const App = () => {

  return (
    <UserProvider>
      <HashRouter>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          
        <Routes>
          <Route path="/login" element={<Login />} />
          {/*<Route exact path="/login" name="Login Page" element={<Login />} />*/}
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
          
        </Suspense>
      </HashRouter>
    </UserProvider>
  )
}

export default App
