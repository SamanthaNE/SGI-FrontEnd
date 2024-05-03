import React, { useState } from 'react'
import HeadersSP from '../../../data_files/HeadersSP'
import { CButton, CCard, CCardBody, CCardSubtitle, CCol, CFormCheck, CFormSelect, CRow } from '@coreui/react'
import InfoSP from '../../../components/cards/InfoSP'
import TabsSP from '../../../components/tabs/TabsSP'
import { dataSPDataCuration, rgroupsSPDataCuration } from '../../../data_files/HardData'

const SPDataCuration = () => {
  const [isPrincipalAuthor, setIsPrincipalAuthor] = useState(null);
  const [isRelatedProject, setIsRelatedProject] = useState(null);
  const [isActivatedQ, setActivatedQ] = useState(false)
  const [selectedGroups, setSelectedGroups] = useState([]);
  
  const handleRadioChange = (e) => {
    setIsPrincipalAuthor(e.target.value === 'YesAuthor');
    setActivatedQ(true)
  };

  const handleGroupChange = (e) => {
    const { checked, value } = e.target;
    const newSelectedGroups = checked ? [...selectedGroups, value] : selectedGroups.filter((group) => group !== value);

    setSelectedGroups(newSelectedGroups);
  };

  const handleRadioChangeProject = (e) => {
    setIsRelatedProject(e.target.value === 'Yes');
  };

  const authorOptions = dataSPDataCuration.map((item) => {
    return item.author.map((authorItem) => ({
      label: authorItem.name,
      value: authorItem.id,
    }));
  }).flat();

  return (
    <>
      {/* PUBLICATION DATA */}
      <div className='h4 mb-3'>Registro de informacion</div>
      <div className='h6 mb-3'>Publicación seleccionada</div>

      <InfoSP data={dataSPDataCuration} headers={HeadersSP} detail={false}/>
      
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
              (<CFormSelect className='mt-2' options={authorOptions} label="Seleccione al autor principal"/>)
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
                  <CFormCheck key={indexH} button={{ color: 'primary', variant: 'outline' }} /*type="radio"*/ id={`${indexH}`} label={groupsItems.Acronym} onChange={handleGroupChange} checked={selectedGroups.includes(groupsItems.id.toString())} value={groupsItems.id.toString()}/>
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
          <TabsSP /*id del autor*/ typeTab={"scientific"} />
        )
      }

      {/* FINISH REV */}
      {
        isActivatedQ &&
        (
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3 mb-4">
          <CButton color="primary" variant="outline" className="me-md-2">Cancelar</CButton>
          <CButton color="primary" href="#">Terminar revisión</CButton>
        </div>
        )
      }
    </>
  )
}

export default SPDataCuration