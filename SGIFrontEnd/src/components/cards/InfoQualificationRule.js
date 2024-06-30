import React, { useState } from 'react'
import { CCard, CCardBody, CCol, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CRow } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import ModalDelete from '../modals/ModalDelete'
import { KEYCODE } from '../../config/Constants'
import axiosInstance from '../../config/HTTPService'
import MessageToast from '../toast/MessageToast'

const InfoQualificationRule = ({dataRules, headers, btnnav}) => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [ruleToDelete, setRuleToDelete] = useState(null)

  const [toastVisible, setToastVisible] = useState(false)
  const [toastHeader, setToastHeader] = useState('')
  const [toastBody, setToastBody] = useState('')

  const handleNavigationAction = (ruleID) => {
    navigate(btnnav + `/${ruleID}`)
  }

  const handleDelete = (ruleID) => {
    setRuleToDelete(ruleID)
    setVisible(true)
  }

  const confirmDelete = async(e) => {   
    const params = {
      keyCode: KEYCODE,
      idRule: ruleToDelete
    };

    try {
      const response = await axiosInstance.post('api/evaluationrules/disablerule', params);
      
      if (response) {
        console.log(response)
        setToastHeader('Mensaje')
        setToastBody(response.data.messageConfirm)
        setToastVisible(true)
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      }
    } catch (error) {
      console.error('Error:', error);
      setToastHeader('Error')
      setToastBody('Hubo un problema al eliminar la regla. Por favor, inténtelo de nuevo.')
      setToastVisible(true)
    }

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
                              <CDropdownItem onClick={() => handleNavigationAction(ruleItem.idRule)}>
                                <CIcon icon={cilPencil} /> Editar
                              </CDropdownItem>
                              <CDropdownItem onClick={() => handleDelete(ruleItem.idRule)}>
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

    {toastVisible && 
      <MessageToast header={toastHeader} body={toastBody} />
    }
  </>
  )
}

export default InfoQualificationRule