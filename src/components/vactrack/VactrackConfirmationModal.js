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

const ConfirmRequestModal = ({ title,show, handleClose,handleConfirm }) => {

  return (
    <CModal
      visible={show}
      onClose={() => handleClose()}
      aria-labelledby="AddUserModal"
      size='lg'
    >
      <CModalHeader closeButton>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Are you sure you want to proceed? This action cannot be undone.</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleClose}>Cancel</CButton>
        <CButton color="primary" onClick={handleConfirm}>Confirm</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ConfirmRequestModal;
