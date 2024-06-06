import React, { useEffect, useState } from 'react'
import { dataGroups, dataProjectSearch, dataQualificationCategories, dataSelectedPublication } from '../../../../data_files/HardData'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import AccordionInfo from '../../../../components/accordion/AccordionInfo'
import { KEYCODE } from '../../../../config/Constants'
import axiosInstance from '../../../../config/HTTPService'
import LoadingSpinner from '../../../../components/spinner/LoadingSpinner'

const GroupDetail = () => {
  const { elementID } = useParams() 
  const [dataAPIGroup, setDataAPIGroup] = useState(null);

  // RESEARCH GROUPS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          'keyCode': KEYCODE,
          'idOrgUnit': elementID
        };
        
        const response = await axiosInstance.get('api/researchgroups/detail', { params });
        setDataAPIGroup(response.data.researchGroupDetail);
        console.log(response.data.researchGroupDetail)
      } catch (error) {
        setDataAPIGroup([])
        console.error('Error:', response.data.message);
      }
    }
  
    fetchData();
  }, [])

  return (
    <>
    {
      dataAPIGroup ?
      (<>
        <div className='h4'>{dataAPIGroup.name}</div>
        <CRow>
          <CCol sm={5}>
            <CCard className='my-3'>
              <CCardBody>
                <div className="h6 mb-3">Datos generales</div>

                <CRow>
                  <CCol sm={3} className="h6">Estado</CCol>
                  <CCol className="text-body">{dataAPIGroup.statusGroup ?? "-"}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={3} className="h6">Categoría</CCol>
                  <CCol className="text-body">{dataAPIGroup.categoryGroup ?? "-"}</CCol>
                </CRow>
                
                {/*
                dataQualificationCategories.length > 0 ?
                  dataQualificationCategories.map((categoryItem, indexC) => {
                    return (
                      <CRow key={indexC}>
                        <CCol className='text-body mb-2' sm={6}>{categoryItem.name}</CCol>
                        <CCol className='text-body mb-2' sm={2}>-</CCol> 
                        <CCol className='text-body mb-2' sm={2}>-</CCol>
                        <CCol className='text-body mb-2' sm={2}>{categoryItem.minimum_score}</CCol>
                      </CRow>
                    )
                  })
                  :
                  <div className="text-body"><em>No asignado</em></div>
                */}

                <CRow>
                  <CCol className='h6 mt-2 mb-3' sm={6}>Rubros de evaluacion</CCol>
                  <CCol className='h6 mt-2 mb-3' sm={2}>Cant.</CCol>
                  <CCol className='h6 mt-2 mb-3' sm={2}>Ptje.</CCol>
                  <CCol className='h6 mt-2 mb-3' sm={2}>Ptje. Min.</CCol>
                </CRow>
                <CRow>
                  <CCol className='text-body mb-2' sm={6}>Productos de nuevo conocimiento</CCol>
                  <CCol className='text-body mb-2' sm={2}>-</CCol> {/* DINAMICO */}
                  <CCol className='text-body mb-2' sm={2}>-</CCol> {/* DINAMICO */}
                  <CCol className='text-body mb-2' sm={2}>10</CCol> {/* DINAMICO */}
                </CRow>
                <CRow>
                  <CCol className='text-body mb-2' sm={6}>Productos de formación</CCol>
                  <CCol className='text-body mb-2' sm={2}>-</CCol> {/* DINAMICO */}
                  <CCol className='text-body mb-2' sm={2}>-</CCol> {/* DINAMICO */}
                  <CCol className='text-body mb-2' sm={2}>8</CCol> {/* DINAMICO */}
                </CRow>
                <CRow>
                  <CCol className='text-body mb-2' sm={6}>Productos de divulgación y difusión</CCol>
                  <CCol className='text-body mb-2' sm={2}>-</CCol> {/* DINAMICO */}
                  <CCol className='text-body mb-2' sm={2}>-</CCol> {/* DINAMICO */}
                  <CCol className='text-body mb-2' sm={2}>4</CCol> {/* DINAMICO */}
                </CRow>
                <CRow className='custom-border-padding-eval'>
                  <CCol className='h6 mt-2' sm={8}>Puntaje total</CCol>
                  <CCol className='text-body mb-2' sm={2}>-</CCol> {/* DINAMICO */}
                  <CCol className='text-body mb-2' sm={2}>22</CCol> {/* DINAMICO */}
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={7}>
            <CCard className='my-3 '>
              <CCardBody>
                <div className="h6 mb-3">Integrantes</div>
                {dataAPIGroup.researchersList ?
                  dataAPIGroup.researchersList.map((teamItems, indexT) => {
                    return (
                      <CRow key={indexT}>
                        <CCol className='text-body mb-2' sm={1}>{indexT + 1}.</CCol>
                        <CCol className='text-body mb-2' sm={7}>{teamItems.firstNames} {teamItems.familyNames}</CCol>
                        <CCol className='text-body mb-2' sm={4}>{teamItems.idRolePerson}</CCol>
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

        <AccordionInfo title={'Publicaciones'} data={dataAPIGroup.relatedPublications}/>
        <AccordionInfo title={'Proyectos'} data={dataAPIGroup.relatedProjects}/>
      </>)
      :
      (<LoadingSpinner />)
    }
    </>
  )
}

export default GroupDetail