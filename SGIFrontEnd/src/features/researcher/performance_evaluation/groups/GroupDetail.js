import React, { useEffect, useState } from 'react'
import { dataGroups, dataProjectSearch, dataSelectedPublication } from '../../../../data_files/HardData'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import AccordionInfo from '../../../../components/accordion/AccordionInfo'
import { KEYCODE } from '../../../../config/Constants'
import axiosInstance from '../../../../config/HTTPService'
import LoadingSpinner from '../../../../components/spinner/LoadingSpinner'
import ErrorNotification from '../../../../components/cards/ErrorNotification'

const GroupDetail = () => {
  const { elementID } = useParams() 
  const [dataAPIGroup, setDataAPIGroup] = useState(null);
  const [error, setError] = useState(false);

  let totalScore = 0;

  // RESEARCH GROUPS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          'keyCode': KEYCODE,
          'idOrgUnit': elementID
        };
        
        const response = await axiosInstance.get('api/evaluation/researchgroupdetail', { params });
        setDataAPIGroup(response.data.researchGroupDetail);
        console.log(response.data.researchGroupDetail)
      } catch (error) {
        setError(true);
        console.error('Error:', response.data.message);
      }
    }
  
    fetchData();
  }, [])

  return (
    <>
      {dataAPIGroup ?
        <>
          <div className='h4'>{dataAPIGroup.name}</div>
          <CRow>
            <CCol sm={5}>
              <CCard className='my-3'>
                <CCardBody>
                  <div className="h6 mb-3">Datos generales</div>

                  <CRow>
                    <CCol sm={5} className="h6">Año de evaluación</CCol>
                    <CCol className="text-body">{dataAPIGroup.evaluationYear ?? <i>Sin información</i>}</CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={5} className="h6">Estado</CCol>
                    <CCol className="text-body">{dataAPIGroup.statusGroup ?? <i>Sin información</i>}</CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={5} className="h6">Categoría</CCol>
                    <CCol className="text-body">{dataAPIGroup.categoryGroup ?? <i>Sin información</i>}</CCol>
                  </CRow>

                  <div className="h6 mt-3">Evaluación actual</div>
                  <CRow>
                    <CCol className='h6 mt-2 mb-3' sm={8}>Rubros de evaluacion</CCol>
                    <CCol className='h6 mt-2 mb-3' sm={2}>Cant.</CCol>
                    <CCol className='h6 mt-2 mb-3' sm={2}>Ptje.</CCol>
                  </CRow>
                  {
                    dataAPIGroup.researchGroupEvaluationDetail && dataAPIGroup.researchGroupEvaluationDetail.length > 0 ?
                    (
                      dataAPIGroup.researchGroupEvaluationDetail.map((item, indexRGED) => {
                        totalScore += item.categoryScore
                        return (
                          <CRow key={indexRGED}>
                            <CCol className='text-body mb-2' sm={8}>{item.categoryName ?? "-"}</CCol>
                            <CCol className='text-body mb-2' sm={2}>{item.quantity ?? "-"}</CCol>
                            <CCol className='text-body mb-2' sm={2}>{item.categoryScore ?? "-"}</CCol>
                          </CRow>
                        )
                      })
                    )
                    :
                    (
                      <>
                        <CRow>
                          <CCol className='text-body mb-2' sm={8}>Productos de nuevo conocimiento</CCol>
                          <CCol className='text-body mb-2' sm={2}>-</CCol>
                          <CCol className='text-body mb-2' sm={2}>-</CCol>
                        </CRow>
                        <CRow>
                          <CCol className='text-body mb-2' sm={8}>Productos de formación</CCol>
                          <CCol className='text-body mb-2' sm={2}>-</CCol>
                          <CCol className='text-body mb-2' sm={2}>-</CCol>
                        </CRow>
                        <CRow>
                          <CCol className='text-body mb-2' sm={8}>Productos de divulgación y difusión</CCol>
                          <CCol className='text-body mb-2' sm={2}>-</CCol>
                          <CCol className='text-body mb-2' sm={2}>-</CCol>
                        </CRow>
                      </>
                    )
                  }
                  
                  <CRow className='custom-border-padding-eval'>
                    <CCol className='h6 mt-2' sm={10}>Puntaje total</CCol>
                    <CCol className='text-body mb-2' sm={2}>{totalScore}</CCol> {/* DINAMICO */}
                  </CRow>
                  
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm={7}>
              <CCard className='my-3 '>
                <CCardBody>
                  <div className="h6 mb-3">Integrantes</div>
                  {dataAPIGroup.researchersList.length > 0 ?
                    dataAPIGroup.researchersList.map((teamItems, indexT) => {
                      return (
                        <CRow key={indexT}>
                          <CCol className='text-body mb-2' sm={1}>{indexT + 1}.</CCol>
                          <CCol className='text-body mb-2' sm={7}>{(teamItems.firstNames ?? "-") + " " + (teamItems.familyNames ?? "-")}</CCol>
                          <CCol className='text-body mb-2' sm={4}>{teamItems.idRolePerson ?? <i>Sin información</i>}</CCol>
                        </CRow>
                      )
                    })
                    :
                    <div className="text-body"><em>No asignado</em></div>
                  }
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <AccordionInfo title={'Publicaciones'} data={dataAPIGroup.relatedPublications} userRole={'researcher'}/>
          <AccordionInfo title={'Proyectos'} data={dataAPIGroup.relatedProjects} userRole={'researcher'}/>
        </>
      :
      (
        error ?
        (<ErrorNotification/>)
        :
        (<LoadingSpinner />)
      )
    }
    </>
  )
}

export default GroupDetail