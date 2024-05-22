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
  setSelectedOptionAuthor,
} from '../../../redux/slices/curationSlice'

const SPDataCuration = () => {
  const { elementID } = useParams()
  const navigate = useNavigate()
/*
  const [isPrincipalAuthor, setIsPrincipalAuthor] = useState(null);
  const [isRelatedProject, setIsRelatedProject] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedOptionAuthor, setSelectedOptionAuthor] = useState('');
*/
  const [isActivatedQ, setActivatedQ] = useState(false)

  /* REDUX */
  const dispatch = useDispatch();
  const {
    isPrincipalAuthor,
    isRelatedProject,
    selectedGroups,
    selectedOptionAuthor,
    selectedProjects
  } = useSelector((state) => state.curation)

  const [revisionData, setRevisionData] = useState([]);

  useEffect(() => {
    if (isPrincipalAuthor !== null) {
      setActivatedQ(true)
    }
  }, [isPrincipalAuthor])

  const handleRadioChange = (e) => {
    console.log('radio')
    dispatch(setIsPrincipalAuthor(e.target.value === 'YesAuthor'))
    dispatch(setSelectedOptionAuthor(''))
    setActivatedQ(true)
  }

  const handleGroupChange = (e) => {
    console.log('Group')
    const { checked, value } = e.target;
    const newSelectedGroups = checked ? [...selectedGroups, value] : selectedGroups.filter((group) => group !== value);

    dispatch(setSelectedGroups(newSelectedGroups))
  };

  const handleRadioChangeProject = (e) => {
    console.log('Project')
    dispatch(setIsRelatedProject(e.target.value === 'Yes'));
  };

  const handleRevision = () => {
    console.log(isPrincipalAuthor);
    console.log(selectedGroups);
    console.log(selectedOptionAuthor);

    const results = [];
    setRevisionData(results);
  };

  return (
    <>
      {/* PUBLICATION DATA */}
      <div className='h4 mb-3'>Registro de informacion</div>
      <div className='h6 mb-3'>Publicación seleccionada</div>

      <InfoSP data={dataScopusPublication[elementID - 1]} headers={HeadersSP} detail={false}/>
      
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
                  {dataScopusPublication[elementID - 1].author.map((option) => (
                    <option  key={option.id} value={option.name}>
                      {option.name}
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
              {rgroupsSPDataCuration.map((groupsItems, indexH) => {
                return (
                  <CFormCheck key={indexH} button={{ color: 'primary', variant: 'outline' }} id={`${indexH}`} 
                              label={groupsItems.Acronym} onChange={handleGroupChange} 
                              checked={selectedGroups.includes(groupsItems.id.toString())} value={groupsItems.id.toString()}/>
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
          <CButton color="primary" onClick={handleRevision} disabled={isRelatedProject}>Terminar revisión</CButton>
        </div>
        )
      }
    </>
  )
}

export default SPDataCuration