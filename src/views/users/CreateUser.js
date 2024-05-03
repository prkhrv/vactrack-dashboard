import React, { useEffect, useState } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CInputGroup,
  CFormSelect,
  CFormLabel,
  CFormInput,
  CInputGroupText
} from '@coreui/react-pro';
import { toast } from 'react-toastify';
import { postDataAuthenticated } from 'src/utils/apiService';

const AddUserModal = ({ show, handleClose }) => {
    const [loading,setLoading] = useState(false);
    const [userName, setUserName] = useState('');
    const [isNameValid,setNameValid] = useState(false);
    const [isEmailValid,setEmailValid] = useState(false);
    const [isPasswordValid,setPasswordValid] = useState(false);
    const [isGroupValid,setGroupValid] = useState(false);


    const [selectedGroup, setSelectedGroup] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [options,setOptions] = useState([]);

  const configureOptions = (groups) => {
    var opts = [];
    groups.forEach(group => {
        opts.push(<option value={group._id}>{group.name}</option>)
    })
    setOptions(opts);
  }

  async function fetchGroups(){
    setLoading(true);
    const response = await postDataAuthenticated("/groups/fetch");
    if(response.statusCode !== 200){
        setLoading(false);
        toast.error("Cannot Fetch Data");
        return [];
    }else{
        setLoading(false);
        return response.data;
    }}

    useEffect(() => {
        fetchGroups().then(groups => {
            configureOptions(groups);
        });
        return () => {
            setLoading(false);
        } 
    },[]);


  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
    validateName(event.target.value);
  };

  const validateName = (name) => {
    if (/^[a-zA-Z\s]{5,}$/.test(name)) {
      setNameValid(true);
    } else {
        setNameValid(false);
    //   setError('Name must contain only letters and have at least 5 characters.');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    validateEmail(event.target.value);
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmailValid(true);
    } else {
        setEmailValid(false);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validatePassword(event.target.value);
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{12,}$/;
    if (passwordRegex.test(password)) {
      setPasswordValid(true);
    } else {
       setPasswordValid(false);
    }
  };

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
    validateGroup(event.target.value);
  };

  const validateGroup = (group) =>{
    if(group !== ""){
      setGroupValid(true);
    }else{
      setGroupValid(false);
    }
  }

  const handleAddUser = async(event) => {
    // Implement functionality to add user here
    if(!isNameValid || !isEmailValid || !isPasswordValid || !isGroupValid){
        toast.error("Please fill all the fields correctly");
        return;
    }else{
        const data = {
            name:userName,
            email:email,
            password:password,
            group:selectedGroup
        };
        const response = await postDataAuthenticated("/university-admins",data);
        if(response.statusCode !== 201 && response.statusCode !== 403){
            toast.error("Cannot Add User");
        }else if(response.statusCode === 403){
            toast.error("You don't have permission to perform this action");
        }else{
            toast.success("User Added Successfully");
            handleClose(true); // Close the modal after adding user
        }
    }
  };

  return (
    <CModal
      visible={show}
      onClose={() => handleClose()}
      aria-labelledby="AddUserModal"
      size='lg'
    >
      <CModalHeader closeButton>
        <CModalTitle>Add User</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
            <CInputGroup className='mb-3'>
                <CInputGroupText id="inputGroup-sizing-default">Group</CInputGroupText>
                <CFormSelect custom id="group" value={selectedGroup} onChange={handleGroupChange} valid={isGroupValid} invalid={!isGroupValid} feedbackValid="Looks good!" feedbackInvalid="Please select a group">
                <option value="">Select Group</option>
                {options}
            </CFormSelect>
            </CInputGroup>
            <CInputGroup className='mb-3'>
                <CInputGroupText id="inputGroup-sizing-default">Name</CInputGroupText>
                <CFormInput id="userName" placeholder="Enter name" value={userName} valid={isNameValid} invalid={!isNameValid} onChange={handleUserNameChange} feedbackValid="Looks good!" feedbackInvalid="Please enter a valid name" required/>
            </CInputGroup>
            <CInputGroup className='mb-3'>
                <CInputGroupText id="inputGroup-sizing-default">Email</CInputGroupText>
                <CFormInput type='email' id="email" placeholder="Enter email" value={email} valid={isEmailValid} invalid={!isEmailValid} onChange={handleEmailChange} feedbackValid="Looks good!" feedbackInvalid="Please enter a valid email" required autoComplete="email"/>
            </CInputGroup>
            <CInputGroup className='mb-3'>
                <CInputGroupText id="inputGroup-sizing-default">Password</CInputGroupText>
                <CFormInput type='password' id="password" placeholder="Enter a secure password" value={password} onChange={handlePasswordChange} valid={isPasswordValid} invalid={!isPasswordValid} feedbackValid="Looks good!" feedbackInvalid="Password must be at least 12 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol." required autoComplete="password"/>
            </CInputGroup>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleClose}>Close</CButton>
        <CButton color="primary" onClick={handleAddUser}>Add User</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddUserModal;
