import React, { useState,useRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToaster
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import VactrackAlert  from 'src/components/vactrack/VactrackAlert';
import { postData } from 'src/utils/apiService'
import authStore from 'src/stores/authStore';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  //Router
  const navigate = useNavigate();

  // States
  const [toast,addToast] = useState(0);
  const [validated,setValidated] = useState(false);
  const toaster = useRef();
  const errorToast = VactrackAlert("Please enter the valid data");

  const [emailInput,setEmailInput] = useState("");
  const [passwordInput,setPasswordInput] = useState("");

  const handleSubmit = async(event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      addToast(errorToast);
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if(form.checkValidity() === true){
      event.preventDefault();
      const response = await postData("/auth/login", {
        "email":emailInput,
        "password":passwordInput
      });
      
      if(response.statusCode !== 200){
        addToast(VactrackAlert(response.message));
      }else{
        authStore.verifyPassword(response.token);
        authStore.setNextPage("/");
        navigate("/mfa");
      }
      
    }
    event.preventDefault();
  }
  

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm className='needs-validation' noValidate validated={validated} onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                        type="email" 
                        placeholder="Email"
                        autoComplete="email"
                        feedbackValid="Looks good!"
                        feedbackInvalid="Please enter a Valid Email"
                        id='email'
                        onChange={(e) => setEmailInput(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        feedbackValid="Looks good!"
                        feedbackInvalid="Password cannot be empty"
                        id='password'
                        onChange={(e) => setPasswordInput(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" onClick={() => navigate('/forgotpassword')}>
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
