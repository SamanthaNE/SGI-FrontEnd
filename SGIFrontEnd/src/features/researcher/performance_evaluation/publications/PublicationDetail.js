import React from 'react'
import { dataProjectSearch, dataSelectedPublication } from '../../../../data_files/HardData'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import AccordionInfo from '../../../../components/accordion/AccordionInfo'

 {/* CON LA API VA SIN [elementID - 1] */}

const PublicationDetail = () => {
  const { elementID } = useParams() 

  return (
    <>
      <div className='h4'>{dataSelectedPublication[elementID - 1].title}</div>

      <CCard className='my-3'>
        <CCardBody>
          <CRow>
            <div className="h6 mb-3">Detalles de la publicación</div>
            <CCol sm={8} >
              <CRow>
                <div className="h6 mb-2">Resumen</div>
                <div className="mb-2 text-body">{dataSelectedPublication[elementID - 1].abstract ?? "-"}</div>
              </CRow>
              <CRow>
                <CCol sm={3} className="h6">Tipo de recurso</CCol>
                <CCol className="text-body">{dataSelectedPublication[elementID - 1].resourcetype ?? "-"}</CCol>
              </CRow>
              <CRow>
                <CCol sm={3} className="h6">Nombre de la revista</CCol>
                <CCol className="text-body">{dataSelectedPublication[elementID - 1].name ?? "-"}</CCol>
              </CRow>
              <CRow>
                <CCol sm={3} className="h6">Volumen</CCol>
                <CCol className="text-body">{dataSelectedPublication[elementID - 1].volumen ?? "-"}</CCol>
              </CRow>
              <CRow>
                <CCol sm={3} className="h6">Rango de páginas</CCol>
                <CCol className="text-body">{dataSelectedPublication[elementID - 1].page_range ?? "-"}</CCol>
              </CRow>
              <CRow>
                <CCol sm={3} className="h6">Año</CCol>
                <CCol className="text-body">{dataSelectedPublication[elementID - 1].year ?? "-"}</CCol>
              </CRow>
            </CCol>

            <CCol sm={4} className='custom-border-padding'>
              <CRow className="mb-2">
                <div className="h6 mb-2">Autores</div>
                {dataSelectedPublication[elementID - 1].author.map((authorItems, indexA) => {
                  return (
                    <div className="text-body" key={indexA}>{indexA + 1}. {authorItems.name}</div>
                  )
                })}
              </CRow>
              <CRow className="mb-2">
                <div className="h6 mb-2">Grupo(s) de investigación</div>
                {dataSelectedPublication[elementID - 1].group.length > 0 ?
                  dataSelectedPublication[elementID - 1].group.map((groupItems, indexG) => {
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
                <div className="text-body">{dataSelectedPublication[elementID - 1].category ?? <em>No asignado</em>}</div>
              </CRow>
              <CRow className="mb-2">
                <div className="h6 mb-2">Sub categoría</div>
                <div className="text-body">{dataSelectedPublication[elementID - 1].subcategory ?? <em>No asignado</em>}</div>
              </CRow>
              <CRow className="mb-2">
                <div className="h6 mb-2">Puntaje asignado</div>
                <div className="text-body">{dataSelectedPublication[elementID - 1].score ?? <em>No asignado</em>}</div>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <AccordionInfo title={'Proyectos'} data={dataProjectSearch}/>
    </>
  )
}

export default PublicationDetail