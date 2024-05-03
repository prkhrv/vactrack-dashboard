import React, { useEffect, useState } from 'react'
import { CRow, CCol, CCard, CCardHeader,CBadge,CButton,CCollapse, CCardBody,CAvatar,CSmartTable,CModal,CModalHeader,CModalTitle,CModalBody,CModalFooter, CTabPane, CNav, CNavItem, CNavLink, CTabContent } from '@coreui/react-pro'
import { postDataAuthenticated } from 'src/utils/apiService'
import VactrackAlert from 'src/components/vactrack/VactrackAlert'
import { toast } from 'react-toastify';
import permissionStore from 'src/stores/permissionStore'
import CIcon from '@coreui/icons-react'
import { cilUser, cilUserPlus } from '@coreui/icons'


const ArchivedStudents = () => {
    const [details, setDetails] = useState([])
    const [loading,setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [students,seteStudents] = useState([]);

    // const [userToDelete,setUserToDelete] = useState("null");
    // const [editUser,setEditUser] = useState({});
    // const permissions = permissionStore.getPermissions();
    // const usersPermission = permissions.find(permission => permission.name === 'ArchivedStudents');
    // const canCreateUsers = usersPermission ? usersPermission.create : false;


    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    // const handleCloseModal = (created = false) => {
    //     if(created){
    //         fetchUsers().then(users => {
    //             setUsers(users);
    //             setLoading(false);
    //         });
    //     }
    //     setShowModal(false);

    // };


    // const showEditRequestModal = (value,user) =>{
    //     setEditUser(user);
    //     setShowEditModal(value);
    // }

    // const handleCloseEditModal = (edited = false) =>{
    //     if(edited){
    //         fetchUsers().then(users => {
    //             setUsers(users);
    //             setLoading(false);
    //         });
    //     }
    //     setEditUser({});
    //     setShowEditModal(false);
    // }
    
    // const handleShowModal = (value) => {
    //     setShowModal(value);
    // };


    // const handleShowRequestModal = (value,id) => {
    //     setUserToDelete(id);
    //     setShowRequestModal(value);
    // }

    // async function handleDeleteUser(){
    //     console.log(`Delete user ${userToDelete}`);
    //     setLoading(true);
    //     const data = {
    //         id: userToDelete
    //     };

    //     const response = await postDataAuthenticated(`/university-admins/profile/delete`,data);
    //     if(response.statusCode === 200){
    //         toast.success("User Deleted Successfully");
    //         await fetchUsers().then(users => {
    //             setUsers(users);
    //             setLoading(false);
    //         });
    //     }else{
    //         setLoading(false);
    //         if(response.statusCode === 403){
    //             toast.error("You don't have permission to perform this action");
    //         }else{
    //             toast.error("Cannot Delete User");
    //         }
    //     }

    //     setShowRequestModal(false);
    // }
    
    const columns = [
        {
            key: 'sr',
            label: '#',
            filter: false,
            sorter: false,
            _style: { width: '1%' }
        },
        {
            key: 'name',
            _style: { width: '15%' },
        },
        // {
        //     key: 'email',
        //     _style: { width: '20%' },
        // },
        { 
            key: 'dob',
            label: 'Date of Birth',
            _style: { width: '15%' }
        },
        { 
            key: 'degree_type',
            label: 'Student Type',
            _style: { width: '15%' }
        },
        { 
            key: 'date_joined',
            label: 'Date Joined',
            _style: { width: '15%' }
        },
        { 
            label: 'Status',
            key: 'status',
            _style: { width: '15%' }
        },
        { 
            label: 'Overall Status',
            key: 'is_compliant',
            _style: { width: '15%' }
        },
        {
            key: 'show_details',
            label: '',
            _style: { width: '1%' },
            filter: false,
            sorter: false,
        },
    ]

    async function fetchStudents(){
        setLoading(true);
        const response = await postDataAuthenticated("/student/fetch?filter=archived");
        if(response.statusCode !== 200){
            toast.error("Cannot Fetch Data");
            return [];
        }else{
            return response.data;
        }
    }

    useEffect(() => {
        fetchStudents().then(students => {
            seteStudents(students);
            setLoading(false);
        })
    },[])

const getBadge = (status) => {
    if(status){
        return {background:'#16C09830',color:'#008767'}
    }
    return {background:'#FFC5C590',color:'#DF0404'}
//   switch (status) {
//     case 'Active':
//       return 'success'
//     case 'Inactive':
//       return 'secondary'
//     case 'Pending':
//       return 'warning'
//     case 'Banned':
//       return 'danger'
//     default:
//       return 'primary'
//   }
}
const toggleDetails = (index) => {
  const position = details.indexOf(index)
  let newDetails = details.slice()
  if (position !== -1) {
    newDetails.splice(position, 1)
  } else {
    newDetails = [...details, index]
  }
  setDetails(newDetails)
}


return (
    <div>
    {/* <AddUserModal show={showModal} handleClose={handleCloseModal} /> */}
    {/* <ConfirmRequestModal title="Confirm Action" show={showRequestModal} handleConfirm={() => handleDeleteUser()} handleClose={() => handleShowRequestModal(false,"null")}/> */}
    {/* <EditUserModal show={showEditModal} handleClose={handleCloseEditModal} user={editUser}/> */}
    <CCard className="mb">
        <CCardBody>
        <CSmartTable
            activePage={1}
            cleaner
            clickableRows
            columns={columns}
            columnFilter
            columnSorter
            // footer
            loading={loading}
            items={students}
            itemsPerPageSelect
            itemsPerPage={10}
            pagination
            onFilteredItemsChange={(items) => {
                console.log(items)
            }}
            onSelectedItemsChange={(items) => {
                console.log(items)
            }}
            scopedColumns={{
                sr: (item, index) => (
                    <td>
                        {index + 1}
                    </td>
                ),
                name: (item) => (
                    <td>
                        {item.first_name} {item.last_name}
                    </td>
                ),
                dob: (item) => (
                    <td>
                        {formatDate(item.dob)}
                    </td>
                ),
                // avatar: (item) => (
                //     <td>
                //     <CAvatar src={`/images/avatars/${item.avatar}`} />
                //     </td>
                // ),
                date_joined: (item) =>(
                    <td>
                        {formatDate(item.date_joined)}
                    </td>
                ),

            is_compliant: (item) => (
                <td>
                <CBadge style={getBadge(item.is_compliant)}>{item.is_compliant ? 'Compliant': 'Not Compliant'}</CBadge>
                </td>
            ),
            show_details: (item) => {
                return (
                <td className="py-2">
                <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => {
                        toggleDetails(item._id)
                    }}>
                {details.includes(item._id) ? 'Hide' : 'Show'}
                </CButton>
                </td>
            )
        },
        details: (item) => {
        return (
          <CCollapse visible={details.includes(item._id)}>
            <CCardBody className="p-3">
              {/* <h4>{item.username}</h4> */}
              <p className="text-muted">User since: {formatDate(item.created_date)}</p>

              
              <CButton size="sm" color="info" style={{marginRight:'10px'}} onClick={() => console.log("")}>
                Edit Profile
              </CButton>
              
              <CButton size="sm" color="danger" className="ml-1" onClick={() => console.log("")}>
                Delete
              </CButton>
            </CCardBody>
          </CCollapse>
        )
      },
    }}
    sorterValue={{ column: 'status', state: 'asc' }}
    tableFilter
    tableProps={{
      className: 'add-this-class',
      responsive: true,
      striped: false,
      hover: true,
    }}
    tableBodyProps={{
      className: 'align-middle'
    }}/>
    </CCardBody>
    </CCard>
    </div>    
);

}

export default ArchivedStudents
