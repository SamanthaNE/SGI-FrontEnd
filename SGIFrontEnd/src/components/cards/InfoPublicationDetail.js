import React from 'react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'

const InfoPublicationDetail = ({data, validation = true}) => {
  return (
    <>
      <CCard className='my-3'>
        <CCardBody>
          <CRow>
            <div className="h6 mb-3">Detalles de la publicación</div>
            <CCol sm={validation === true ? 8 : 12} >
              <CRow>
                <div className="h6 mb-2">Resumen</div>
                <div className="mb-2 text-body">{data.abstractPublication ?? "-"}</div>
              </CRow>
              <CRow>
                <CCol sm={3} className="h6">Tipo de recurso</CCol>
                <CCol className="text-body">{data.resourceTypeCOARName ?? "-"}</CCol>
              </CRow>
              <CRow>
                <CCol sm={3} className="h6">Nombre de la revista</CCol>
                <CCol className="text-body">{data.publishedIn ?? "-"}</CCol>
              </CRow>
              <CRow>
                <CCol sm={3} className="h6">Volumen</CCol>
                <CCol className="text-body">{data.volume ?? "-"}</CCol>
              </CRow>
              <CRow>
                <CCol sm={3} className="h6">Rango de páginas</CCol>
                <CCol className="text-body">{(data.startPage ?? "-") + " " + (data.endPage ?? "-")}</CCol>
              </CRow>
              <CRow>
                <CCol sm={3} className="h6">Año</CCol>
                <CCol className="text-body">{data.publicationDate ?? "-"}</CCol>
              </CRow>
            </CCol>
          {
            (validation) && 
            (
              <CCol sm={4} className='custom-border-padding'>
                <CRow className="mb-2">
                  <div className="h6 mb-2">Autores</div>
                  {data.authorsList ?
                    data.authorsList.map((authorItems, indexA) => {
                      return (
                        <div className="text-body" key={indexA}>{indexA + 1}. {authorItems.givenName} {authorItems.surname}</div>
                      )
                    })
                    :
                    <div className="text-body"><em>No asignado</em></div>
                  }
                </CRow>
                <CRow className="mb-2">
                  <div className="h6 mb-2">Grupo(s) de investigación</div>
                  {data.group && Array.isArray(data.group) ?
                    (data.group.map((groupItems, indexG) => {
                      return (
                        <div className="text-body" key={indexG}>{groupItems.name}</div>
                      )
                    }))
                    :
                    (<div className="text-body"><em>No asignado</em></div>)
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
            )
          }
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default InfoPublicationDetail