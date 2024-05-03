import React from 'react'
import { CButton, CCard, CCardBody, CCardTitle, CCol, CRow, CFormSelect } from '@coreui/react'

const ProjectsFilter = () => {
  return (
    <CCard className="mb-3">
      <CCardBody>
        <CCardTitle className="h6">Filtros de búsqueda</CCardTitle>
        <CRow className="mb-2">
          <CCol className="sm-6">
            <input
              className="form-control"
              type="text"
              placeholder="Título del proyecto"
              aria-label="title"
            />
          </CCol>
          <CCol className="sm-6">
            <input
              className="form-control"
              type="text"
              placeholder="Unidad organizacional"
              aria-label="name"
            />
          </CCol>
        </CRow>
        <CRow className="mb-2">
          <CCol className="sm-4">
            <input
              className="form-control"
              type="text"
              placeholder="Fecha de inicio (DD-MM-AAAA)"
              aria-label="startdate"
            />
          </CCol>
          <CCol className="sm-4">
            <input
              className="form-control"
              type="text"
              placeholder="Fecha de fin (DD-MM-AAAA)"
              aria-label="enddate"
            />
          </CCol>
          <CCol className="sm-4">
            <CFormSelect
              aria-label="status"
              options={[
                'Estado',
                { label: 'Por iniciar', value: '1' },
                { label: 'En ejecución', value: '2' },
                { label: 'En proceso de cierre', value: '3' },
                { label: 'Cierre', value: '3' },
                { label: 'Cancelado', value: '4' },
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

export default ProjectsFilter