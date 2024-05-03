import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader,CBadge,CButton,CCollapse, CCardBody,CAvatar,CSmartTable,CModal,CModalHeader,CModalTitle,CModalBody,CModalFooter } from '@coreui/react-pro'
import { rgbToHex } from '@coreui/utils'
import { postDataAuthenticated } from 'src/utils/apiService'
import VactrackAlert from 'src/components/vactrack/VactrackAlert'
import { toast } from 'react-toastify';
import permissionStore from 'src/stores/permissionStore'
import CIcon from '@coreui/icons-react'
import { cilUser, cilUserPlus } from '@coreui/icons'
import AddUserModal from './CreateUser'
import ConfirmRequestModal from 'src/components/vactrack/VactrackConfirmationModal'
import EditUserModal from './EditUser'

// const ThemeView = () => {
//   const [color, setColor] = useState('rgb(255, 255, 255)')
//   const ref = createRef()

//   useEffect(() => {
//     const el = ref.current.parentNode.firstChild
//     const varColor = window.getComputedStyle(el).getPropertyValue('background-color')
//     setColor(varColor)
//   }, [ref])

//   return (
//     <table className="table w-100" ref={ref}>
//       <tbody>
//         <tr>
//           <td className="text-medium-emphasis">HEX:</td>
//           <td className="font-weight-bold">{rgbToHex(color)}</td>
//         </tr>
//         <tr>
//           <td className="text-medium-emphasis">RGB:</td>
//           <td className="font-weight-bold">{color}</td>
//         </tr>
//       </tbody>
//     </table>
//   )
// }

// const ThemeColor = ({ className, children }) => {
//   const classes = classNames(className, 'theme-color w-75 rounded mb-3')
//   return (
//     <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
//       <div className={classes} style={{ paddingTop: '75%' }}></div>
//       {children}
//       <ThemeView />
//     </CCol>
//   )
// }

// ThemeColor.propTypes = {
//   children: PropTypes.node,
//   className: PropTypes.string,
// }

const Users = () => {
    const [details, setDetails] = useState([])
    const [loading,setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [users,setUsers] = useState([]);
    const [userToDelete,setUserToDelete] = useState("null");
    const [editUser,setEditUser] = useState({});
    const permissions = permissionStore.getPermissions();
    const usersPermission = permissions.find(permission => permission.name === 'Users');
    const canCreateUsers = usersPermission ? usersPermission.create : false;


    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const handleCloseModal = (created = false) => {
        if(created){
            fetchUsers().then(users => {
                setUsers(users);
                setLoading(false);
            });
        }
        setShowModal(false);

    };


    const showEditRequestModal = (value,user) =>{
        setEditUser(user);
        setShowEditModal(value);
    }

    const handleCloseEditModal = (edited = false) =>{
        if(edited){
            fetchUsers().then(users => {
                setUsers(users);
                setLoading(false);
            });
        }
        setEditUser({});
        setShowEditModal(false);
    }
    
    const handleShowModal = (value) => {
        setShowModal(value);
    };


    const handleShowRequestModal = (value,id) => {
        setUserToDelete(id);
        setShowRequestModal(value);
    }

    async function handleDeleteUser(){
        console.log(`Delete user ${userToDelete}`);
        setLoading(true);
        const data = {
            id: userToDelete
        };

        const response = await postDataAuthenticated(`/university-admins/profile/delete`,data);
        if(response.statusCode === 200){
            toast.success("User Deleted Successfully");
            await fetchUsers().then(users => {
                setUsers(users);
                setLoading(false);
            });
        }else{
            setLoading(false);
            if(response.statusCode === 403){
                toast.error("You don't have permission to perform this action");
            }else{
                toast.error("Cannot Delete User");
            }
        }

        setShowRequestModal(false);
    }
    
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
            _style: { width: '20%' },
        },
        {
            key: 'email',
            _style: { width: '20%' },
        },
        { 
            key: 'group',
            label: 'Group',
            _style: { width: '20%' }
        },
        { 
            label: 'Status',
            key: 'is_active',
        _style: { width: '20%' }
        },
        {
            key: 'show_details',
            label: '',
            _style: { width: '1%' },
            filter: false,
            sorter: false,
        },
    ]

    async function fetchUsers(){
        setLoading(true);
        const response = await postDataAuthenticated("/university-admins/fetch");
        if(response.statusCode !== 200){
            toast.error("Cannot Fetch Data");
            return [];
        }else{
            return response.data;
        }
    }

    useEffect(() => {
        fetchUsers().then(users => {
            setUsers(users);
            setLoading(false);
        })
    },[])
// const usersData = [
//   {
//     id: 1,
//     name: 'Samppa Nori',
//     email: 'samppa.nori@example.com',
//     avatar: '1.jpg',
//     registered: '2022/01/01',
//     group: 'Admin',
//     status: 'Active',
//   },
// ]
const getBadge = (status) => {
    if(status){
        return 'success'
    }
    return 'danger'
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
    <AddUserModal show={showModal} handleClose={handleCloseModal} />
    <ConfirmRequestModal title="Confirm Action" show={showRequestModal} handleConfirm={() => handleDeleteUser()} handleClose={() => handleShowRequestModal(false,"null")}/>
    <EditUserModal show={showEditModal} handleClose={handleCloseEditModal} user={editUser}/>
    <CCard className="mb">
        <CCardBody>
            <CRow>
                <CCol sm={5}>
                    <div>
                        <h5><strong>Users</strong></h5>
                    </div>
                    {/* <div className="small text-medium-emphasis">
                        List of users
                    </div> */}
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                    {/* <CButton color="primary" className="float-end">
                        <i className="fas fa-download" />
                        Import
                    </CButton> */}
                    {
                        canCreateUsers && (<CButton color="primary" className="float-end" style={{marginRight: '10px'}} onClick={() => handleShowModal(!showModal)}>
                             <CIcon icon={cilUserPlus} className="text-light"/>
                             <span style={{ marginLeft: '5px', color:'white' }}>Add User</span>
                            </CButton>)
                    }
                </CCol>
            </CRow>
        <CSmartTable
            activePage={1}
            cleaner
            clickableRows
            columns={columns}
            columnFilter
            columnSorter
            // footer
            loading={loading}
            items={users}
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
                // avatar: (item) => (
                //     <td>
                //     <CAvatar src={`/images/avatars/${item.avatar}`} />
                //     </td>
                // ),
                group: (item) => (
                    <td>
                        <p>{item.group.name}</p>
                    </td>
                ),
            is_active: (item) => (
                <td>
                <h5><CBadge color={getBadge(item.is_active)}>{item.is_active ? 'Active': 'Inactive'}</CBadge></h5>
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

              
              <CButton size="sm" color="info" style={{marginRight:'10px'}} onClick={() => showEditRequestModal(!showEditModal,item)}>
                Edit Profile
              </CButton>
              
              <CButton size="sm" color="danger" className="ml-1" onClick={() => handleShowRequestModal(!showRequestModal,item._id)}>
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
      striped: true,
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

export default Users
