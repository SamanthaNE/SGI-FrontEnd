import React, { useEffect, useState } from 'react'
import { dataProjectSearch, dataSelectedPublication } from '../../../../data_files/HardData'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import AccordionInfo from '../../../../components/accordion/AccordionInfo'
import LoadingSpinner from '../../../../components/spinner/LoadingSpinner'
import { KEYCODE } from '../../../../config/Constants'
import axiosInstance from '../../../../config/HTTPService'

const PublicationDetail = () => {
  const { elementID } = useParams();
  const [dataAPIPublication, setDataAPIPublication] = useState(null);

  // PUBLICATIONS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          'keyCode': KEYCODE,
          'publicationId': elementID
        };
        
        const response = await axiosInstance.get('api/evaluation/publicationdetail', { params });
        setDataAPIPublication(response.data.publicationAuthorDetail);
        console.log(response.data.publicationAuthorDetail)
      } catch (error) {
        setDataAPIPublication([])
        console.error('Error:', response.data.message);
      }
    }
  
    fetchData();
  }, [])

  return (
    <>
    {
      dataAPIPublication ?
      (<>
        <div className='h4'>{dataAPIPublication.title}</div>

        <CCard className='my-3'>
          <CCardBody>
            <CRow>
              <div className="h6 mb-3">Detalles de la publicación</div>
              <CCol sm={8} >
                <CRow>
                  <div className="h6 mb-2">Resumen</div>
                  <div className="mb-2 text-body">{dataAPIPublication.abstractPublication ?? "-"}</div>
                </CRow>
                <CRow>
                  <CCol sm={3} className="h6">Tipo de recurso</CCol>
                  <CCol className="text-body">{dataAPIPublication.resourceTypeCOARName ?? "-"}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={3} className="h6">Nombre de la revista</CCol>
                  <CCol className="text-body">{dataAPIPublication.publishedIn ?? "-"}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={3} className="h6">Volumen</CCol>
                  <CCol className="text-body">{dataAPIPublication.volume ?? "-"}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={3} className="h6">Rango de páginas</CCol>
                  <CCol className="text-body">{(dataAPIPublication.startPage ?? "-") + " " + (dataAPIPublication.endPage ?? "-")}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={3} className="h6">Año</CCol>
                  <CCol className="text-body">{dataAPIPublication.publicationDate ?? "-"}</CCol>
                </CRow>
              </CCol>

              <CCol sm={4} className='custom-border-padding'>
                <CRow className="mb-2">
                  <div className="h6 mb-2">Autores</div>
                  {dataAPIPublication.authorsList.map((authorItems, indexA) => {
                    return (
                      <div className="text-body" key={indexA}>{indexA + 1}. {(authorItems.givenName ?? '-') + ' ' + (authorItems.surname ?? '-')}</div>
                    )
                  })}
                </CRow>
                <CRow className="mb-2">
                  <div className="h6 mb-2">Grupo(s) de investigación</div>
                  {dataSelectedPublication[0].group.length > 0 ?
                    dataSelectedPublication[0].group.map((groupItems, indexG) => {
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
                  <div className="text-body">{dataSelectedPublication[0].category ?? <em>No asignado</em>}</div>
                </CRow>
                <CRow className="mb-2">
                  <div className="h6 mb-2">Sub categoría</div>
                  <div className="text-body">{dataSelectedPublication[0].subcategory ?? <em>No asignado</em>}</div>
                </CRow>
                <CRow className="mb-2">
                  <div className="h6 mb-2">Puntaje asignado</div>
                  <div className="text-body">{dataSelectedPublication[0].score ?? <em>No asignado</em>}</div>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

        <AccordionInfo title={'Proyectos'} data={dataAPIPublication.relatedProjects}/>
      </>)
      :
      (<LoadingSpinner />)
    }
    </>
  )
}

export default PublicationDetail