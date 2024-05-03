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

const AddGroupModal = ({ show, handleClose }) => {
    const [loading,setLoading] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [isNameValid,setNameValid] = useState(false);

  const handleUserNameChange = (event) => {
    setGroupName(event.target.value);
    validateName(event.target.value);
  };

  const validateName = (name) => {
    if (/^[a-zA-Z\s]{3,}$/.test(name)) {
      setNameValid(true);
    } else {
        setNameValid(false);
    //   setError('Name must contain only letters and have at least 5 characters.');
    }
  };


  const handleAddGroup = async(event) => {
    // Implement functionality to add user here
    if(!isNameValid){
        toast.error("Please fill all the fields correctly");
        return;
    }else{
        const data = {
            name:groupName,
        };
        const response = await postDataAuthenticated("/groups",data);
        console.log(response);
        if(response.statusCode !== 201){
            toast.error("Cannot Add Group");
        }else{
            toast.success("Group Added Successfully");
            handleClose(true); // Close the modal after adding user
        }
    }
  };

  return (
    <CModal
      visible={show}
      onClose={() => handleClose()}
      aria-labelledby="AddGroupModal"
      size='lg'
    >
      <CModalHeader closeButton>
        <CModalTitle>Add Group</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
            <CInputGroup className='mb-3'>
                <CInputGroupText id="inputGroup-sizing-default">Name</CInputGroupText>
                <CFormInput id="groupName" placeholder="Enter name" value={groupName} valid={isNameValid} invalid={!isNameValid} onChange={handleUserNameChange} feedbackValid="Looks good!" feedbackInvalid="Please enter a valid name" required/>
            </CInputGroup>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleClose}>Close</CButton>
        <CButton color="primary" onClick={handleAddGroup}>Add Group</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddGroupModal;
