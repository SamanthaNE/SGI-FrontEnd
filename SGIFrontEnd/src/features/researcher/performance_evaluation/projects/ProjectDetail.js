import React from 'react'
import { dataSelectedProject, dataSelectedPublication } from '../../../../data_files/HardData'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import AccordionInfo from '../../../../components/accordion/AccordionInfo'

 {/* CON LA API VA SIN [elementID - 1] */}

const ProjectDetail = () => {
  const { elementID } = useParams() 

  return (
    <>
      <div className='h4'>{dataSelectedProject[elementID - 1].title}</div>

      <CCard className='my-3'>
        <CCardBody>
          <CRow>
            <div className="h6 mb-3">Detalles del proyecto</div>
            <CCol sm={8} >
              <CRow>
                <div className="h6 mb-2">Resumen</div>
                <div className="mb-2 text-body">{dataSelectedProject[elementID - 1].abstract ?? <em>Sin información disponible</em>}</div>
              </CRow>
              <CRow>
                <CCol sm={3} className="h6">Estado</CCol>
                <CCol className="text-body">{dataSelectedProject[elementID - 1].status ?? "-"}</CCol>
              </CRow>
              <CRow>
                <CCol sm={3} className="h6">Fecha de inicio</CCol>
                <CCol className="text-body">{dataSelectedProject[elementID - 1].startDate ?? "-"}</CCol>
              </CRow>
              <CRow>
                <CCol sm={3} className="h6">Fecha de fin</CCol>
                <CCol className="text-body">{dataSelectedProject[elementID - 1].endDate ?? "-"}</CCol>
              </CRow>
              <CRow className="mb-2">
                <div className="h6 mb-2">Equipo encargado del proyecto</div>
                {dataSelectedProject[elementID - 1].project_team.length > 0 ?
                  dataSelectedProject[elementID - 1].project_team.map((teamItems, indexT) => {
                    return (
                      <div className="text-body" key={indexT}>{indexT + 1}. {teamItems.name} - {teamItems.Tipo_Recurso}</div>
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
                {dataSelectedProject[elementID - 1].group.length > 0 ?
                  dataSelectedProject[elementID - 1].group.map((groupItems, indexG) => {
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
                <div className="text-body">{dataSelectedProject[elementID - 1].category ?? <em>No asignado</em>}</div>
              </CRow>
              <CRow className="mb-2">
                <div className="h6 mb-2">Sub categoría</div>
                <div className="text-body">{dataSelectedProject[elementID - 1].subcategory ?? <em>No asignado</em>}</div>
              </CRow>
              <CRow className="mb-2">
                <div className="h6 mb-2">Puntaje asignado</div>
                <div className="text-body">{dataSelectedProject[elementID - 1].score ?? <em>No asignado</em>}</div>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <AccordionInfo title={'Financiamientos'} data={dataSelectedProject[elementID - 1].funding}/>
    </>
  )
}

export default ProjectDetail