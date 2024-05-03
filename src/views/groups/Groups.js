import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader,CBadge,CButton,CCollapse, CCardBody,CAvatar,CSmartTable } from '@coreui/react-pro'
import { rgbToHex } from '@coreui/utils'
import { postDataAuthenticated } from 'src/utils/apiService'
import PermissionTable from '../permissions/PermissionTable'
import { toast } from 'react-toastify';
import permissionStore from 'src/stores/permissionStore'
import CIcon from '@coreui/icons-react'
import { cilGroup, cilObjectGroup, cilPlus } from '@coreui/icons'
import AddGroupModal from './AddGroup'


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

const Groups = () => {
    const [details, setDetails] = useState([]);
    // const [groupPermissions,setGroupPermissions] = useState([]);
    const [loading,setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [groups,setGroups] = useState([]);
    const permissions = permissionStore.getPermissions();
    const groupPermission = permissions.find(permission => permission.name === 'Groups');
    const canCreateGroups = groupPermission ? groupPermission.create : false;

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const handleCloseModal = (created = false) => {
        if(created){
            fetchGroups().then(groups => {
                setGroups(groups);
                setLoading(false);
            });
        }
        setShowModal(false);

      };
    
      const handleShowModal = (value) => {
        setShowModal(value);
      };
    
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
            label:'Created Date',
            key: 'created_date',
            _style: { width: '20%' },
        },
        {
            key: 'show_details',
            label: '',
            _style: { width: '1%' },
            filter: false,
            sorter: false,
        },
    ]

    async function fetchGroups(){
        setLoading(true);
        const response = await postDataAuthenticated("/groups/fetch");
        if(response.statusCode !== 200){
            return [];
        }else{
            
            return response.data;
        }
    }

    useEffect(() => {
        fetchGroups().then(groups => {
            setGroups(groups);
            setLoading(false);
        });
    },[])

    const savePermissions = async(id,permissions) => {
        console.log(id, permissions);
        const response = await postDataAuthenticated("/permissions/edit",{
            id: `${id}`,
            modules: permissions,
        });
        if(response.statusCode !== 200){
            toast.error('Error saving permissions');
        }else{
            toast.success('Permissions saved successfully');
        }
    }

    const setUpdatedPermissions = (id, permissions) => {
        setGroups(groups =>{
            const updatedGroups = groups.map(group => {
                if(group.permissions[0]._id == id){
                    return {...group, permissions:[{
                        ...group.permissions[0],
                        modules: permissions
                    }]};
                }
                return group;
            });
            return updatedGroups;
        });
    };
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
    <AddGroupModal show={showModal} handleClose={handleCloseModal} />
    <CCard className="mb">
        <CCardBody>
            <CRow>
                <CCol sm={5}>
                    <div>
                        <h5><strong>Groups</strong></h5>
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
                        canCreateGroups && (<CButton color="primary" className="float-end" style={{marginRight: '10px'}} onClick={() =>  handleShowModal(!showModal)}>
                             <CIcon icon={cilPlus} className="text-light"/>
                             <span style={{ marginLeft: '5px', color:'white' }}>Add Group</span>
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
            items={groups}
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
                created_date : (item) => (
                    <td>
                        {formatDate(item.created_date)}
                    </td>
                ),
                avatar: (item) => (
                    <td>
                    <CAvatar src={`/images/avatars/${item.avatar}`} />
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
                {details.includes(item._id) ? 'Hide' : 'Permissions'}
                </CButton>
                </td>
            )
        },
        details: (item,index) => {
        return (
          <CCollapse visible={details.includes(item._id)}>
            <CCardBody className="p-3">
              <p className="text-muted">Permissions:</p>
              <PermissionTable id={item.permissions[0]._id} permissionsData={item.permissions[0].modules} setUpdatedPermissions={setUpdatedPermissions}/>

              <div className="mt-3 d-flex justify-content-start">
              <CButton size="sm" color="info" onClick={() => savePermissions(item.permissions[0]._id,item.permissions[0].modules)}>
                Save
              </CButton>
              </div>
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
    }}
  />
    </CCardBody>
    </CCard>
    </div>   
);

}

export default Groups
