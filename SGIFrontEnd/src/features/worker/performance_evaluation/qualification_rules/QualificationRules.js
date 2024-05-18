import React from 'react'
import AccordionRules from '../../../../components/accordion/AccordionRules'
import { CButton, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { dataQualificationCategories, dataQualificationRules } from '../../../../data_files/HardData'

const QualificationRules = () => {
  const navigate = useNavigate()

  return (
    <>
      <CRow className='h4 mb-3'>
        <CCol sm={10}>Reglas de calificación</CCol>
        <CCol className="d-grid gap-2 d-md-flex justify-content-md-end" sm={2}>
          <CButton color="primary" onClick={(e) => navigate("registro")}>
            <CIcon icon={cilPlus} /> Agregar
          </CButton>
        </CCol>
      </CRow>

      {dataQualificationRules.map((categoryItem, indexC) => {
        return (
          <AccordionRules key={indexC} title={categoryItem.category} subcategory={categoryItem.subcategories} />
        )
      })}
    </>
  )
}

export default QualificationRules