import { CButton, CCard, CCardBody, CCardSubtitle, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CRow } from '@coreui/react'
import React, { useState } from 'react'
import StatusProject from '../../../data_files/StatusProject'
import TabsSP from '../../../components/tabs/TabsSP'
import { useNavigate, useParams } from 'react-router-dom'
import { NPOrg, ProjectTeamRoles } from '../../../data_files/FiltersData'
import DateInput from '../../../components/dateInput/DateInput'
import { useDispatch, useSelector } from 'react-redux'

import {
  setProjectTitle,
  setSelectedOptionOrg,
  setDateStart,
  setDateEnd,
  setActiveStatus,
  setActiveSubStatus,
  setIsProjectFunded,
  setIsTeam
} from '../../../redux/slices/curationSlice'


const NewProject = () => {
  const { elementID } = useParams()
  const navigate = useNavigate()
  /*
  const [projectTitle, setProjectTitle] = useState('');
  const [selectedOptionOrg, setSelectedOptionOrg] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [activeStatus, setActiveStatus] = useState(null)
  const [activeSubStatus, setActiveSubStatus] = useState(null)
  const [isProjectFunded, setIsProjectFunded] = useState(null);
  const [isTeam, setIsTeam] = useState(null);
  */

  const [isFinish, setIsFinish] = useState(false);

  const [projectData, setProjectData] = useState([]);

  const dispatch = useDispatch()

  const { 
    projectTitle,
    selectedOptionOrg,
    dateStart,
    dateEnd, 
    activeStatus,
    activeSubStatus,
    isProjectFunded,
    isTeam
  } = useSelector((state) => state.curation.newProject)

  const selectedFundings = useSelector((state) => state.curation.selectedFundings)

  const handleStatus = (e) => {
    dispatch(setActiveStatus(e.target.value))
  }

  const handleSubStatus = (e) => {
    dispatch(setActiveSubStatus(e.target.value))
  }

  const handleRadioChangeTeam = (e) => {
    dispatch(setIsTeam(e.target.value === 'Yes'))
  }

  const handleRadioChangeFunding = (e) => {
    dispatch(setIsProjectFunded(e.target.value === 'Yes'))
    setIsFinish(true);
  };
  
  const handleDateStartChange = (newDate) => {
    console.log(newDate)
    dispatch(setDateStart(newDate))
  };

  const handleDateEndChange = (newDate) => {
    console.log(newDate)
    dispatch(setDateEnd(newDate))
  };

  const handleProjectData = () => {
    console.log(activeStatus);
    console.log(activeSubStatus);
    console.log(isProjectFunded);
    console.log(isTeam);
    console.log(projectTitle);
    console.log(selectedOptionOrg);
    console.log(dateStart)
    console.log(dateEnd)

    const results = [];
    setProjectData(results);

    /* ACA DEBE GUARDA LA INFO EN LA DB Y REDIRECCIONAR A LA PAGINA ANTERIOR */
  };

  return (
    <>
      {/* PUBLICATION DATA */}
      <div className='h4 mb-3'>Registro de nuevo proyecto</div>

      {/* AUTHOR */}
      <CCard className='mb-3'>
        <CCardBody>
          <CCardSubtitle className="mb-3 text-body-secondary">Complete la siguiente informacion</CCardSubtitle>
          <CForm>
            <CFormInput className='mb-3' type="input" id="title" label="Título del proyecto" placeholder="Título" 
                        value={projectTitle} onChange={(e) => dispatch(setProjectTitle(e.target.value))}
            />
          </CForm>
          <CFormSelect  className='mb-3' aria-label="orgunit" label="Unidad organizacional" 
                        value={selectedOptionOrg} onChange={(e) => dispatch(setSelectedOptionOrg(e.target.value))}>
            <option value="">Seleccione una opción</option>
            {NPOrg.map((option) => (
              <option  key={option.value} value={option.label}>
                {option.label}
              </option>
            ))}
          </CFormSelect>
          <CRow className="align-items-end">
            <CCol>
              <DateInput label='Periodo de ejecución estimado' placeholder='Fecha de inicio (DD-MM-AAAA)' 
                          onChange={handleDateStartChange} value={dateStart}/>
            </CCol>
            <CCol>
              <DateInput placeholder='Fecha de fin (DD-MM-AAAA)' onChange={handleDateEndChange} value={dateEnd}/>
            </CCol>
          </CRow>
          
          <div className='text-body-secundary'>Estado actual del proyecto</div>
          <div className="mt-2">
            {StatusProject.map((statusItems, indexH) => {
              return (
                <CFormCheck key={indexH} button={{ color: 'primary', variant: 'outline' }} type="radio" 
                            name="options-outlined-status" id={statusItems.name} label={statusItems.name} 
                            value={statusItems.id} onChange={handleStatus} checked={activeStatus === statusItems.id}/>
              )
            })}
          </div>

          {
            (activeStatus !== null) &&
            (
              <div className="mt-2">
                  {StatusProject.find((status) => status.id === activeStatus).substatus.map((substatus) => (
                    <CFormCheck key={substatus.id} button={{ color: 'primary', variant: 'outline' }} type="radio" 
                                name="options-outlined-substatus" id={substatus.name} label={substatus.name} 
                                value={substatus.id} onChange={handleSubStatus} checked={activeSubStatus === substatus.id} />
                  ))}
              </div>
            )
          }

          <div className='text-body-secundary mt-3 mb-1'>Grupo de investigadores a cargo</div>
            <CFormCheck inline type="radio" name="inlineRadioOptions1" id="cbTeamYes" value="Yes" label="Si" 
                        onChange={handleRadioChangeTeam} checked={isTeam === true}/>
            <CFormCheck inline type="radio" name="inlineRadioOptions1" id="cbTeamNo" value="No" label="No" 
                        onChange={handleRadioChangeTeam} checked={isTeam === false}/>
            <CFormSelect  className='mb-3' aria-label="orgunit"
                          /*value={selectedOptionRole} onChange={(e) => dispatch(setSelectedOptionRole(e.target.value))}*/>
              <option value="">Seleccione una opción</option>
              {ProjectTeamRoles.map((option) => (
                <option  key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </CFormSelect>
          
          {
            (isTeam) && 
            (
              <CForm className="row my-3">
                <CCol xs={11}>
                  <CFormInput type="text" id="teamSearch" placeholder="Nombre del investigador" />
                </CCol>
                <CCol xs={1}>
                  <CButton color="primary" type="submit">Buscar</CButton>
                </CCol>
              </CForm>
            )

          }

          {/* NO SE SI ES NECESARIO */}
          <div className='text-body-secundary mt-3 mb-1'>¿El proyecto se encuentra financiado?</div>
          <CFormCheck inline type="radio" name="inlineRadioOptions2" id="cbRProjectYes" value="Yes" label="Si" 
                      onChange={handleRadioChangeFunding} checked={isProjectFunded === true}/>
          <CFormCheck inline type="radio" name="inlineRadioOptions2" id="cbRProjectNo" value="No" label="No" 
                      onChange={handleRadioChangeFunding} checked={isProjectFunded === false}/>

        </CCardBody>
      </CCard>

      {/* PROJECTS */}
      {
        isProjectFunded &&
        (
          <TabsSP /*id del autor*/  SPID={elementID} typeTab={"funding"} data={selectedFundings} />
        )
      }

      {/* FINISH REV */}
      {
        isFinish && 
        (
          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3 mb-4">
            <CButton color="primary" variant="outline" className="me-md-2" onClick={() =>navigate(-1)}>Cancelar</CButton>
            <CButton color="primary" disabled={isProjectFunded} onClick={handleProjectData}>Guardar</CButton>
          </div>
        )
      }
    </>
  )
}

export default NewProject