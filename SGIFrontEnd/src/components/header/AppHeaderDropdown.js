import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CCol,
  CRow
} from '@coreui/react'
import { cilUser, cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const AppHeaderDropdown = () => {
  const storedUserData = sessionStorage.getItem('user');
  let user = null;
  if (storedUserData) {
    user = JSON.parse(storedUserData);
  }

  return (
    <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
          <CRow>
            <CCol sm="auto" className="pe-0">
              <CAvatar color="primary" size="md" />
            </CCol>
            <CCol sm="auto">
              <div>{user.name}</div>
              <div className="small text-body-secondary">{user.role}</div>
            </CCol>
          </CRow>
        </CDropdownToggle>

      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Perfil
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilAccountLogout} className="me-2" />
          Cerrar Sesión
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
