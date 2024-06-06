import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import AccordionInfo from '../../../../components/accordion/AccordionInfo'
import { KEYCODE } from '../../../../config/Constants'
import axiosInstance from '../../../../config/HTTPService'
import LoadingSpinner from '../../../../components/spinner/LoadingSpinner'
import { dataSelectedProject } from '../../../../data_files/HardData'

const ProjectDetail = () => {
  const { elementID } = useParams();
  const [dataAPIProject, setDataAPIProject] = useState(null);

  // PROJECTS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          'keyCode': KEYCODE,
          'idProject': elementID
        };
        
        const response = await axiosInstance.get('api/evaluation/projectdetail', { params });
        setDataAPIProject(response.data.projectAuthorDetail);
      } catch (error) {
        setDataAPIProject([])
        console.error('Error:', response.data.message);
      }
    }
  
    fetchData();
  }, [])

  return (
    <>
    { dataAPIProject ? 
      (<>
        <div className='h4'>{dataAPIProject.title}</div>

        <CCard className='my-3'>
          <CCardBody>
            <CRow>
              <div className="h6 mb-3">Detalles del proyecto</div>
              <CCol sm={8} >
                <CRow>
                  <div className="h6 mb-2">Resumen</div>
                  <div className="mb-2 text-body">{dataAPIProject.description ?? <em>Sin información disponible</em>}</div>
                </CRow>
                <CRow>
                  <CCol sm={3} className="h6">Estado</CCol>
                  <CCol className="text-body">{dataAPIProject.idProjectStatusTypeCONCYTEC ?? "-"}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={3} className="h6">Fecha de inicio</CCol>
                  <CCol className="text-body">{dataAPIProject.startDate ?? <i>Sin información</i>}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={3} className="h6">Fecha de fin</CCol>
                  <CCol className="text-body">{dataAPIProject.endDate ?? <i>Sin información</i>}</CCol>
                </CRow>
                <CRow className="mb-2">
                  <div className="h6 mb-2">Equipo encargado del proyecto</div>
                  {dataAPIProject.researchers.length > 0 ?
                    dataAPIProject.researchers.map((teamItems, indexT) => {
                      return (
                        <div className="text-body" key={indexT}>{indexT + 1}. {teamItems.firstNames + " " + teamItems.familyNames} - {teamItems.roleName}</div>
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
                  {dataSelectedProject[0].group.length > 0 ?
                    dataSelectedProject[0].group.map((groupItems, indexG) => {
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
                  <div className="text-body">{dataSelectedProject[0].category ?? <em>No asignado</em>}</div>
                </CRow>
                <CRow className="mb-2">
                  <div className="h6 mb-2">Sub categoría</div>
                  <div className="text-body">{dataSelectedProject[0].subcategory ?? <em>No asignado</em>}</div>
                </CRow>
                <CRow className="mb-2">
                  <div className="h6 mb-2">Puntaje asignado</div>
                  <div className="text-body">{dataSelectedProject[0].score ?? <em>No asignado</em>}</div>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

        <AccordionInfo title={'Financiamientos'} data={dataAPIProject.relatedFundingList}/>
      </>)
      :
      (<LoadingSpinner />)
    }
    </>
  )
}

export default ProjectDetail