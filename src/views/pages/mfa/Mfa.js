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
import permissionStore from 'src/stores/permissionStore';
import { useNavigate } from 'react-router-dom';

const Mfa = () => {

  //Router
  const navigate = useNavigate();

  // States
  const [toast,addToast] = useState(0);
  const [validated,setValidated] = useState(false);
  const toaster = useRef();
  const errorToast = VactrackAlert("Please enter the valid OTP");

  const [otpInput,setOtpInput] = useState("");

  const nextPage = authStore.getNextPage();

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
      const response = await postDataAuthenticated("/auth/mfa", {
        "otp":otpInput,
      });

      if(response.statusCode !== 200){
        addToast(VactrackAlert(response.message));
      }else{
        if(nextPage === "/reset-password"){
          authStore.setNextPage("/");
          navigate("/reset-password");
        }else{
          authStore.login(response.token);
          permissionStore.setPermissions(response.permissions);
          navigate("/");
        }
      }
  }
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
                    <h1>Verify Otp</h1>
                    <p className="text-medium-emphasis">Please enter the OTP sent to your email</p>
                    {/* <CInputGroup className="mb-3">
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
                        onChange={(e) => console.log(e.target.value)}
                        required
                      />
                    </CInputGroup> */}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="OTP"
                        autoComplete="otp"
                        feedbackValid="Looks good!"
                        feedbackInvalid="Please enter a valid OTP"
                        minLength={6}  // Minimum length of password is 6 characters.
                        maxLength={6}
                        id='password'
                        onChange={(e) => setOtpInput(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow className='justify-content-start'>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Verify OTP
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

export default Mfa
