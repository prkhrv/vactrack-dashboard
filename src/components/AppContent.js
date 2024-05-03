import React, { Suspense,useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react-pro'

// routes config
import routes from '../routes'
import AppBreadcrumb from './AppBreadcrumb'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



const AppContent = () => {
  const toaster = useRef();
  return (
    <CContainer fluid>
      {/* <AppBreadcrumb /> */}
      <ToastContainer theme='colored'/>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
