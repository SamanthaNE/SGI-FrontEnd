import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardSubtitle, CCol, CFormCheck, CFormSelect, CRow } from '@coreui/react'
import InfoSP from '../../../components/cards/InfoSP'
import TabsSP from '../../../components/tabs/TabsSP'
import { dataSPDataCuration, rgroupsSPDataCuration, dataScopusPublication } from '../../../data_files/HardData'
import { HeadersSP } from '../../../data_files/HeadersSP'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  setIsPrincipalAuthor,
  setIsRelatedProject,
  setSelectedGroups,
  setSelectedOptionGroup,
  setSelectedOptionAuthor,
} from '../../../redux/slices/curationSlice'
import { KEYCODE } from '../../../config/Constants'
import axiosInstance from '../../../config/HTTPService'
import LoadingSpinner from '../../../components/spinner/LoadingSpinner'

const storedUserData = sessionStorage.getItem('user');
let user = null;
if (storedUserData) {
  user = JSON.parse(storedUserData);
}

const SPDataCuration = () => {
  const { elementID } = useParams()
  const navigate = useNavigate()
  const [isActivatedQ, setActivatedQ] = useState(false)

  /* REDUX */
  const dispatch = useDispatch();
  const {
    isPrincipalAuthor,
    isRelatedProject,
    selectedGroups,
    selectedOptionAuthor,
    selectedProjects,
    selectedOptionGroup
  } = useSelector((state) => state.curation)

  useEffect(() => {
    if (isPrincipalAuthor !== null) {
      setActivatedQ(true)
    }
  }, [isPrincipalAuthor])

  const [dataAPI, setDataAPI] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        'keyCode': KEYCODE,
        'scopusPublicationId': elementID
      };

      await axiosInstance.get('api/scopus/publicationdetail', { params })
                      .then((response) => {
                        setDataAPI(response.data.scopusPublicationAuthor);
                      })
                      .catch((err) => {
                        let errMsg;
                        (!err.response) ? errMsg = 'No se pudo conectar con el servidor. Verifique su conexión.' : (err.response.code === 404 ? errMsg = "Servicio no disponible. Intenta más tarde." : errMsg = err.response.data.message);
                        console.log(errMsg);
                        setDataAPI({result:[]})
                      });
    }
  
    fetchData();
  }, [])

  const [dataAPIGroups, setDataAPIGroups] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        'keyCode': KEYCODE,
        'idPerson': user.idPerson ?? 0
      };

      await axiosInstance.get('api/scopus/researchgroupsauthor', { params })
                        .then((response) => {
                          setDataAPIGroups(response.data);
                        })
                        .catch((err) => {
                          let errMsg;
                          (!err.response) ? errMsg = 'No se pudo conectar con el servidor. Verifique su conexión.' : (err.response.code === 404 ? errMsg = "Servicio no disponible. Intenta más tarde." : errMsg = err.response.data.message);
                          console.log(errMsg);
                          setDataAPIGroups({result:[]})
                        });
    }
  
    fetchData();
  }, [isActivatedQ])

  const handleRadioChange = (e) => {
    console.log('radio')
    dispatch(setIsPrincipalAuthor(e.target.value === 'YesAuthor'))
    dispatch(setSelectedOptionAuthor(''))
    setActivatedQ(true)
  }

  const handleGroupChange = (e) => {
    dispatch(setSelectedOptionGroup(e.target.value))
    /*
    const { checked, value } = e.target;
    const newSelectedGroups = checked ? [...selectedGroups, value] : selectedGroups.filter((group) => group !== value);

    dispatch(setSelectedGroups(newSelectedGroups))
    */
  };

  const handleRadioChangeProject = (e) => {
    console.log('Project')
    dispatch(setIsRelatedProject(e.target.value === 'Yes'));
  };

  const handleRevision = async(e) => {
    const params = {
      keyCode: KEYCODE,
      scopusPublicationId: elementID,
      scopusAuthorId: user.scopusAuthorId,
      idPerson: user.idPerson,
      researchGroupIdOrg: selectedOptionGroup,
      projectIds: selectedProjects.length > 0 ? selectedProjects.map(project => project.idProject) : []
    }
    console.log(params)

    try {
      const response = await axiosInstance.post('api/scopus/newpublication', params);
      
      if (response.data) {
        console.log(response.data)
        navigate('/publicaciones/revision')
      } else {
        setError(response.data.message || 'No se pudo terminar correctamente la revisión de la publicación');
      }
      
    } catch (error) {
      console.error('Error:', error);
      setError('No se pudo terminar correctamente la revisión de la publicación');
    }

  };

  return (
    <>
      {/* PUBLICATION DATA */}
      <div className='h4 mb-3'>Registro de informacion</div>
      <div className='h6 mb-3'>Publicación seleccionada</div>

      {
        dataAPI ?
        (
          <>
            <InfoSP data={dataAPI} headers={HeadersSP} detail={false}/>
            
            {/* NEW DATA */}
            <div className='h6 mt-3'>Complete la siguiente informacion</div>

            {/* AUTHOR */}
            <CCard className='mb-3'>
              <CCardBody>
                <CCardSubtitle className="mb-3 text-body-secondary">¿Es el autor principal de la publicación?</CCardSubtitle>
                <CRow>
                  <CCol>
                    <CFormCheck inline type="radio" id="cbPAuthorYes" value="YesAuthor" label="Si, soy el autor principal" onChange={handleRadioChange} checked={isPrincipalAuthor === true}/>
                    <CFormCheck inline type="radio" id="cbPAuthorNo" value="NoAuthor" label="No, soy un coautor" onChange={handleRadioChange} checked={isPrincipalAuthor === false}/>
                  </CCol>
                  <CCol>
                  {
                    (isPrincipalAuthor === false) &&
                    (
                      <CFormSelect aria-label="principalAuthor" value={selectedOptionAuthor} onChange={(e) => dispatch(setSelectedOptionAuthor(e.target.value))}>
                        <option value="">Seleccione al autor principal</option>
                        {dataAPI.authorsList.map((option, indexAL) => (
                          <option  key={indexAL} value={option.authid}>
                            {option.authorName}
                          </option>
                        ))}
                      </CFormSelect>
                    )
                  }
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>

            {/* RESEARCH GROUP */}
            {
              isActivatedQ &&
              (
                <CCard className='mb-3'>
                  <CCardBody>
                    <CCardSubtitle className="mb-3 text-body-secondary">¿A que grupo de investigación pertenece la publicación?</CCardSubtitle>
                    {dataAPIGroups.result.map((groupsItems, indexH) => {
                      return (
                        <CFormCheck key={indexH} button={{ color: 'primary', variant: 'outline' }} type="radio" 
                                    id={groupsItems.acronym} label={groupsItems.acronym} onChange={handleGroupChange} 
                                    checked={selectedOptionGroup === groupsItems.idOrgUnit} value={groupsItems.idOrgUnit}/>
                        /*            
                        <CFormCheck key={indexH} button={{ color: 'primary', variant: 'outline' }} id={`${indexH}`} 
                                    label={groupsItems.acronym} onChange={handleGroupChange} 
                                    checked={selectedGroups.includes(groupsItems.idOrgUnit)} value={groupsItems.idOrgUnit}/>
                        */
                      )
                    })}
                  </CCardBody>
                </CCard>
              )
            }

            {/* RELATED PROJECT */}
            {
              isActivatedQ && 
              (
                <CCard className='mb-3'>
                  <CCardBody>
                    <CCardSubtitle className="mb-3 text-body-secondary">¿La publicación se encuentra vinculada a algún proyecto de investigación?</CCardSubtitle>
                    <CFormCheck inline type="radio" name="inlineRadioOptions2" id="cbRProjectYes" value="Yes" label="Si" onChange={handleRadioChangeProject} checked={isRelatedProject === true}/>
                    <CFormCheck inline type="radio" name="inlineRadioOptions2" id="cbRProjectNo" value="No" label="No" onChange={handleRadioChangeProject} checked={isRelatedProject === false}/>
                  </CCardBody>
                </CCard>
              )
            }

            {/* PROJECTS */}
            {
              isRelatedProject && isActivatedQ &&
              (
                <TabsSP SPID={elementID} typeTab={"scientific"} data={selectedProjects} />
              )
            }

            {/* FINISH REV */}
            {
              isActivatedQ &&
              (
              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3 mb-4">
                <CButton color="primary" variant="outline" className="me-md-2" onClick={() =>navigate(-1)}>Cancelar</CButton>
                <CButton color="primary" onClick={handleRevision} disabled={selectedProjects.length > 0 ? false : isRelatedProject}>Terminar revisión</CButton>
              </div>
              )
            }
          </>
        )
        :
        (
          <LoadingSpinner />
        )
      }
    </>
  )
}

export default SPDataCuration