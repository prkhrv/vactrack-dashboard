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
import { cilLockLocked } from '@coreui/icons'
import VactrackAlert  from 'src/components/vactrack/VactrackAlert';
import { postDataAuthenticated } from 'src/utils/apiService'
import authStore from 'src/stores/authStore';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {

  //Router
  const navigate = useNavigate();

  // States
  const [toast,addToast] = useState(0);
  const [validated,setValidated] = useState(false);
  const toaster = useRef();
  const errorToast = VactrackAlert("Please enter the valid data");

  const [passwordInput,setPasswordInput] = useState("");
  const [reTypepasswordInput,setReTypePasswordInput] = useState("");

  const nextPage = authStore.getNextPage();


  const handleSubmit = async(event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      addToast(errorToast);
      event.preventDefault();
      event.stopPropagation();
    }
    if(passwordInput !== reTypepasswordInput){
      addToast(VactrackAlert("Password and Re-type password should be same"));
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if(form.checkValidity() === true){
      event.preventDefault();
      const response = await postDataAuthenticated("/auth/reset/password", {
        "password":passwordInput
      });
      if(response.statusCode !== 200){
        addToast(VactrackAlert(response.message));
      }else{
        authStore.login(response.token);
        navigate(nextPage);
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
                    <h1>Reset Password</h1>
                    <p className="text-medium-emphasis">Please enter a new secure password</p>
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
                        id='password1'
                        onChange={(e) => setPasswordInput(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Re-Type Password"
                        autoComplete="current-password"
                        feedbackValid="Looks good!"
                        feedbackInvalid="Password cannot be empty"
                        id='password2'
                        onChange={(e) => setReTypePasswordInput(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Reset Password
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ResetPassword
