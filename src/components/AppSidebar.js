import React, { useEffect,useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

import permissionStore from 'src/stores/permissionStore'

const AppSidebar = () => {

  const [routes,setRoutes] = useState([]);
  const [loading,setLoading] = useState(false);

  const getRoutes = useEffect(() => {
    function filterRoutesByPermissions(routes) {
      //permissions
      const permissions = permissionStore.getPermissions();
      // Extract the names of routes that the user has permission to read
      const allowedRouteNames = permissions
          .filter(permission => permission.read)
          .map(permission => permission.name);
  
      // Filter routes based on allowedRouteNames or allow if no permissions are found
      const allowedRoutes = routes.filter(route => allowedRouteNames.includes(route.name) || allowedRouteNames.length === 0);
  
      setRoutes(allowedRoutes);
    }

    filterRoutesByPermissions(navigation);

    // function filterPermissionRoutes(){
    //     // setLoading(true);
    //     const permissions = permissionStore.getPermissions();
    //     var filteredRoutes = [];
    //     for(let i = 0; i < navigation.length; i++){
    //       if(navigation[i].name === "Dashboard"){
    //         filteredRoutes.push(navigation[i]);
    //       }
    //       else if(navigation[i].name === "User Management" || navigation[i].name === "Users"){
    //         if(permissions.view_users){
    //           filteredRoutes.push(navigation[i]);
    //         }
    //       }else if(navigation[i].name === "Groups"){
    //         if(permissions.view_groups){
    //           filteredRoutes.push(navigation[i]);
    //         }
    //       }else{
    //         filteredRoutes.push(navigation[i]);
    //       }
    //     }
    //     setRoutes(filteredRoutes);
    // }
    // filterPermissionRoutes();
},[])
  // const dispatch = useDispatch()
  // const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  // const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className="bg-dark-gradient"
      position="fixed"
      unfoldable={false}
      visible={true}
      onVisibleChange={(visible) => {
        // dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
        <CSidebarToggler
          onClick={() => console.log('toggled')}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={routes} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
