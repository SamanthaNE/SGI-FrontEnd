import React, { useState } from 'react'
import { CCard, CCardBody, CCol, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CRow } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import ModalDelete from '../modals/ModalDelete'

const InfoQualificationRule = ({dataRules, headers, btnnav}) => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [ruleToDelete, setRuleToDelete] = useState(null)

  const handleNavigationAction = (ruleID) => {
    navigate(btnnav + `/${ruleID}`)
  }

  const handleDelete = (ruleID) => {
    setRuleToDelete(ruleID)
    setVisible(true)
  }

  const confirmDelete = () => {
    console.log(`Deleting rule with ID: ${ruleToDelete}`)
    // Logica de eliminacion
    // Se debe actualizar el arreglo de data
    setVisible(false)
  }

  return (
  <>
    {
      dataRules.length == 0 ? 
      (
        <CCard className='mt-1'>
          <CCardBody className='text-center'>
            No se cuenta con información registrada
          </CCardBody>
        </CCard>
      )
      :
      (
        <>
        {dataRules.map((ruleItem, indexR) => (
          <CCard key={indexR} className='mt-1'>
            <CCardBody>
              <CRow className="d-flex align-items-center">
                {headers.map((headerItems, indexH) => {
                  return (
                    <CCol key={indexH} className = {indexH == 0 ? ("col-10") : ("auto")}>
                      {headerItems.value === 'actions' ? 
                        (
                          <CDropdown>
                            <CDropdownToggle color="primary" variant="ghost">Opciones</CDropdownToggle>
                            <CDropdownMenu>
                              <CDropdownItem onClick={() => handleNavigationAction(ruleItem.id)}>
                                <CIcon icon={cilPencil} /> Editar
                              </CDropdownItem>
                              <CDropdownItem onClick={() => handleDelete(ruleItem.id)}>
                                <CIcon icon={cilTrash} /> Eliminar
                              </CDropdownItem>
                            </CDropdownMenu>
                          </CDropdown>
                        )
                        :
                        (ruleItem[`${headerItems.value}`])
                      }
                    </CCol>
                  )
                })}
              </CRow>
            </CCardBody>
          </CCard>
        ))}
        </>
      )
    }

    <ModalDelete 
      title={'Eliminar regla'}
      body={'¿Estas seguro(a) de eliminar la regla seleccionada? Esta acción no es reversible'} 
      visible={visible}
      setVisible={setVisible}
      onDelete={confirmDelete}
    />
  </>
  )
}

export default InfoQualificationRule