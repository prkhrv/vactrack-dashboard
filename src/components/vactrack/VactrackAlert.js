import React from 'react'
import { CToast, CToastBody, CToastClose } from '@coreui/react-pro';

const VactrackAlert = (text,color="danger") => {    
    return (
        <CToast autohide={true} visible={true} color={color} className="text-white align-items-center">
            <div className="d-flex">
                <CToastBody>{text}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
            </div>
        </CToast>
    );
}

export default VactrackAlert;