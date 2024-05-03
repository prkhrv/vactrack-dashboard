import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes,Navigate } from 'react-router-dom'
import './scss/style.scss'
import { inject, observer } from 'mobx-react'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Mfa = React.lazy(() => import('./views/pages/mfa/Mfa'))
const ForgotPassword = React.lazy(() => import('./views/pages/forgotpassword/ForgotPassword'))
const ResetPassword = React.lazy(() => import('./views/pages/resetpassword/ResetPassword'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// Email App
const EmailApp = React.lazy(() => import('./views/apps/email/EmailApp'))

class App extends Component {
  render() {
    const {authStore} = this.props;
    
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>

          {/* <Route exact path='*' element={authStore.isAuthenticated ? <DefaultLayout /> : <DefaultLayout />} /> */}


            
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route path="/mfa" name="MFA" element={authStore.isPasswordVerified ? <Mfa /> : <Navigate to="/login" />} />
            <Route exact path='*' element={authStore.isAuthenticated ? <DefaultLayout /> : <Navigate to="/login"/>} />
            <Route exact path="/forgotpassword" name="Forgot Password" element={<ForgotPassword />} />
            <Route path="/reset-password" name="Reset Password" element={authStore.isPasswordVerified ? <ResetPassword /> : <Navigate to="/forgotpassword" />} />


            {/* <Route exact path="/dashboard" name="Home" element={<DefaultLayout />} /> */}
            {/* <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="/apps/email/*" name="Email App" element={<EmailApp />} />
            <Route path="*" name="Home" element={<DefaultLayout />} /> */}
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default inject('authStore')(observer(App));
