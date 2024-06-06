import React from 'react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'

const InfoProjectDetail = ({data}) => {
  return (
    <>
    <CCard className='my-3'>
        <CCardBody>
          <CRow>
            <div className="h6 mb-3">Detalles del proyecto</div>
            <CCol sm={8} >
              <CRow>
                <div className="h6 mb-2">Resumen</div>
                <div className="mb-2 text-body">{data.description ?? <em>Sin información disponible</em>}</div>
              </CRow>
              <CRow>
                <CCol sm={3} className="h6">Estado</CCol>
                <CCol className="text-body">{data.idProjectStatusTypeCONCYTEC ?? <em>Sin información disponible</em>}</CCol>
              </CRow>
              <CRow>
                <CCol sm={3} className="h6">Fecha de inicio</CCol>
                <CCol className="text-body">{data.startDate ?? "-"}</CCol>
              </CRow>
              <CRow>
                <CCol sm={3} className="h6">Fecha de fin</CCol>
                <CCol className="text-body">{data.endDate ?? "-"}</CCol>
              </CRow>
              <CRow className="mb-2">
                <div className="h6 mb-2">Equipo encargado del proyecto</div>
                {data.researchers ?
                  data.researchers.map((teamItems, indexT) => {
                    return (
                      <div className="text-body" key={indexT}>{indexT + 1}. {teamItems.firstNames} {teamItems.familyNames} - {teamItems.idRolePerson}</div>
                    )
                  })
                  :
                  <div className="text-body"><em>No asignado</em></div>
                }
              </CRow>
            </CCol>

            <CCol sm={4} className='custom-border-padding'>
              <CRow className="mb-2">
                <div className="h6 mb-2">Grupo(s) de investigación</div>
                {data.group && Array.isArray(data.group) ?
                  data.group.map((groupItems, indexG) => {
                    return (
                      <div className="text-body" key={indexG}>{groupItems.name}</div>
                    )
                  })
                  :
                  <div className="text-body"><em>No asignado</em></div>
                }
              </CRow>
              <CRow className="mb-2">
                <div className="h6 mb-2">Categoría</div>
                <div className="text-body">{data.category ?? <em>No asignado</em>}</div>
              </CRow>
              <CRow className="mb-2">
                <div className="h6 mb-2">Sub categoría</div>
                <div className="text-body">{data.subcategory ?? <em>No asignado</em>}</div>
              </CRow>
              <CRow className="mb-2">
                <div className="h6 mb-2">Puntaje asignado</div>
                <div className="text-body">{data.score ?? <em>No asignado</em>}</div>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default InfoProjectDetail