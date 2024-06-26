import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { set } from '../redux/slices/appSlice'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { pucpLogo } from 'src/assets/brand/logopucp'

// sidebar nav config
import { _navResearcher, _navWorker } from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.app.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.app.sidebarShow)

  /* PROVICIONAL */
  const storedUserData = sessionStorage.getItem('user');
  let user = null;
  if (storedUserData) {
    user = JSON.parse(storedUserData);
    console.log('store: ' + user.role)
  }
  else{
    return null
  }
  /* PROVICIONAL */

  return (
    <CSidebar
      className="border-end"
      colorScheme="light"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(set({ sidebarShow: visible }));
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <CIcon customClassName="sidebar-brand-full" icon={pucpLogo} height={32} />
          <CIcon customClassName="sidebar-brand-narrow" icon={pucpLogo} height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      <AppSidebarNav items={user.role === 'Investigador' ? _navResearcher : _navWorker} />

      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch(set({ sidebarUnfoldable: !unfoldable }))}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
