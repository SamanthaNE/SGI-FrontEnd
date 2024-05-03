import React from 'react'
import { CButton, CCard, CCardBody, CCardTitle, CCol, CRow, CFormSelect } from '@coreui/react'

const FundingFilter = () => {
  return (
    <CCard className="mb-3">
      <CCardBody>
        <CCardTitle className="h6">Filtros de búsqueda</CCardTitle>
        <CRow className="mb-2">
          <CCol className="sm-4">
            <input
              className="form-control"
              type="text"
              placeholder="Nombre del financiamiento"
              aria-label="title"
            />
          </CCol>
          <CCol className="sm-4">
            <input
              className="form-control"
              type="text"
              placeholder="Identificador"
              aria-label="identifier"
            />
          </CCol>
          <CCol className="sm-4">
            <CFormSelect
              aria-label="status"
              options={[
                'Entidad financiadora',
                { label: 'Vicerrectorado de Investigación', value: '1' },
                { label: 'Externo', value: '2' },
              ]}
            />
          </CCol>
          <CCol className="sm-4">
            <CFormSelect
              aria-label="typeFunding"
              options={[
                'Tipo de financiamiento',
                { label: 'Fondos propios', value: '1' },
                { label: 'Otras modalidades de financiamiento', value: '2' },
              ]}
            />
          </CCol>
        </CRow>
        
        {/* BUTTONS */}
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <CButton color="primary" variant="outline" className="me-md-2">Limpiar</CButton>
          <CButton color="primary" >Buscar</CButton>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default FundingFilter