import React, { useState } from 'react'
import { CNav, CNavItem, CNavLink } from '@coreui/react-pro'
import ActiveStudents from './ActiveStudents';
import ArchivedStudents from './ArchivedStudents';


const Students = () => {
    const [activeTab,setActiveTab] = useState(0);

    const toggleActiveTab = (tab) => {
        setActiveTab(tab);
    }

return (
    <div>
        <CNav variant="tabs">
            <CNavItem>
                <CNavLink active={activeTab === 0} onClick={() => toggleActiveTab(0)}>Active Students</CNavLink>
            </CNavItem>
            <CNavItem>
                <CNavLink active={activeTab === 1} onClick={() => toggleActiveTab(1)}>Archived Students</CNavLink>
            </CNavItem>
        </CNav>
        {activeTab === 0 && <ActiveStudents/>}
        {activeTab === 1 && <ArchivedStudents/>}
    </div>
    )
}

export default Students
