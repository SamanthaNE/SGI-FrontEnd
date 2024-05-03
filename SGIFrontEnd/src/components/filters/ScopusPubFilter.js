import React from 'react'
import { CButton, CCard, CCardBody, CCardTitle, CCol, CRow, CFormSelect } from '@coreui/react'

const ScopusPubFilter = () => {
  return (
    <CCard className="mb-3">
      <CCardBody>
        <CCardTitle className="h6">Filtros de búsqueda</CCardTitle>
        <CRow className="mb-2">
          <CCol className="sm-6">
            <input
              className="form-control"
              type="text"
              placeholder="Título de la publicación"
              aria-label="title"
            />
          </CCol>
          <CCol className="sm-6">
            <input
              className="form-control"
              type="text"
              placeholder="Nombre de la revista"
              aria-label="name"
            />
          </CCol>
        </CRow>
        <CRow className="mb-2">
          <CCol className="sm-4">
            <input
              className="form-control"
              type="text"
              placeholder="Apellido del autor"
              aria-label="autor"
            />
          </CCol>
          <CCol className="sm-4">
            <CFormSelect
              aria-label="typeD"
              options={[
                'Tipo de documento',
                { label: 'Article', value: '1' },
                { label: 'Conference Paper', value: '2' },
                { label: 'Book Chapter', value: '3' },
              ]}
            />
          </CCol>
          <CCol className="sm-4">
            <CFormSelect
              aria-label="typeS"
              options={[
                'Tipo de fuente',
                { label: 'Journal', value: '1' },
                { label: 'Book Series', value: '2' },
                { label: 'Conference Proceeding', value: '3', disabled: true },
              ]}
            />
          </CCol>
          <CCol className="sm-4">
            <input
              className="form-control"
              type="text"
              placeholder="Año (YYYY)"
              aria-label="year"
            />
          </CCol>
        </CRow>
        
        {/* BUTTONS */}
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <CButton color="primary" variant="outline" className="me-md-2">Limpiar</CButton>
          <CButton color="primary" href="#">Buscar</CButton>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default ScopusPubFilter
