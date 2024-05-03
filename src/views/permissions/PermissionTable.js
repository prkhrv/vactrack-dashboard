import React, {useState} from "react";
import { CTable,CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell  } from "@coreui/react-pro";



const PermissionTable = ({ id,permissionsData,setUpdatedPermissions }) =>{

    const [permissions, setPermissions] = useState(permissionsData);

    const handleCheckboxChange = (permissionName, columnName) => {
        const updatedPermissions = permissions.map(permission => {
          if (permission.name === permissionName) {
            if(columnName === 'read'){
              return { ...permission, [columnName]: !permission[columnName], create: false, edit: false, delete: false, view_all:false,modify_all:false };
            }
            return { ...permission, [columnName]: !permission[columnName] };
          }
          return permission;
        });
        setPermissions(updatedPermissions);
        setUpdatedPermissions(id,updatedPermissions)
      };    

      return (
        <CTable bordered borderColor="dark" striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Module</CTableHeaderCell>
              <CTableHeaderCell scope="col">Read</CTableHeaderCell>
              <CTableHeaderCell scope="col">Create</CTableHeaderCell>
              <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
              <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
              <CTableHeaderCell scope="col">View All</CTableHeaderCell>
              <CTableHeaderCell scope="col">Modify All</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {permissions.map(permission => (
              <CTableRow key={permission.name}>
                <CTableDataCell>{permission.name}</CTableDataCell>
                <CTableDataCell>
                  <input
                    type="checkbox"
                    checked={permission.read}
                    onChange={() => handleCheckboxChange(permission.name, 'read')}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <input
                    type="checkbox"
                    checked={permission.create}
                    onChange={() => handleCheckboxChange(permission.name, 'create')}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <input
                    type="checkbox"
                    checked={permission.edit}
                    onChange={() => handleCheckboxChange(permission.name, 'edit')}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <input
                    type="checkbox"
                    checked={permission.delete}
                    onChange={() => handleCheckboxChange(permission.name, 'delete')}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <input
                    type="checkbox"
                    checked={permission.view_all}
                    onChange={() => handleCheckboxChange(permission.name, 'view_all')}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <input
                    type="checkbox"
                    checked={permission.modify_all}
                    onChange={() => handleCheckboxChange(permission.name, 'modify_all')}
                  />
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      );
}

export default PermissionTable;