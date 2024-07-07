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
  setIsTeam,
  setIsParticipating,
  setTeamProject,
  setSelectedPersonalRole,
  setSelectedProjects
} from '../../../redux/slices/curationSlice'
import { KEYCODE } from '../../../config/Constants'
import { getUserFromSessionStorage } from '../../../utils/userUtils'
import axiosInstance from '../../../config/HTTPService'
import PersonFilter from '../../../components/filters/PersonFilter'

const user = getUserFromSessionStorage();

const NewProject = () => {
  const { elementID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [selectedTP, setSelectedTP] = useState([])
  const [seletecTPPersonalRole, setSeletecTPPersonalRole] = useState(null);

  let selectedTPPR = null;

  const currentProject = useSelector(state => state.curation.selectedProjects);
  const selectedGroup = useSelector(state => state.curation.selectedOptionGroup);

  const { 
    projectTitle,
    selectedOptionOrg,
    dateStart,
    dateEnd, 
    activeStatus,
    activeSubStatus,
    isProjectFunded,
    isTeam,
    isParticipating,
    selectedFundings,
    teamProject,
    selectedPersonalRole
  } = useSelector((state) => state.curation.newProject)

  const currentTeam = useSelector(state => state.curation.newProject.teamProject);

  const handleStatus = (e) => {
    dispatch(setActiveStatus(e.target.value))
  }

  const handleSubStatus = (e) => {
    dispatch(setActiveSubStatus(e.target.value))
  }

  const handleRadioChangeTeam = (e) => {
    dispatch(setIsTeam(e.target.value === 'Yes'))
  }

  const handleRadioChangeParticipation = (e) => {
    dispatch(setIsParticipating(e.target.value === 'Yes'))
  }

  const handleRadioChangeFunding = (e) => {
    dispatch(setIsProjectFunded(e.target.value === 'Yes'))
  };
  
  const handleDateStartChange = (newDate) => {
    dispatch(setDateStart(newDate))
  };

  const handleDateEndChange = (newDate) => {
    dispatch(setDateEnd(newDate))
  };

  const handleSelectedPersonalRole = (e) => { 
    dispatch(setSelectedPersonalRole(e.target.value))

    const data = {
      idPerson: user.idPerson,
      idPersonRole: e.target.value,
      idOrgUnit: selectedGroup
    }

    let updatedTeam;
    teamProject.length > 1 ? 
      updatedTeam = [...currentTeam, data]
      :
      updatedTeam = [data];

    dispatch(setTeamProject(updatedTeam));
  }

  const handleSelectedTPPersonalRole = (e, TP) => { 
    const data = {
      personName: TP.firstNames + " " + TP.familyNames,
      idPerson: TP.idPerson,
      idPersonRole: e.target.value,
      idOrgUnit: null
    }

    console.log(data)
    selectedTPPR = null;

    let updatedTeam = [...currentTeam];

    const existingIndex = updatedTeam.findIndex(item => item.idPerson === TP.idPerson);

    if (existingIndex !== -1) {
      updatedTeam[existingIndex] = data;
    } else {
      updatedTeam.push(data);
    }

    dispatch(setTeamProject(updatedTeam));
  }

  const handleSelectionOfTeam = (data) => {
    setSelectedTP(data);
    console.log(data)
  }

  const handleProjectData = async(e) => {    
    const params = {
      keyCode: KEYCODE,
      title: projectTitle,
      startDate: dateStart,
      endDate: dateEnd,
      idProjectStatusTypeConcytec: activeSubStatus,
      funding: selectedFundings,
      projectTeam: teamProject,
    };

    console.log(params)

    try {
      const response = await axiosInstance.post('api/scopus/newproject', params);
      
      if (response.data) {
        const idProject = response.data.newProjectDto.project.idProject;

        const dataProject = {
          idProject: idProject,
          title: projectTitle,
          startDate: dateStart,
          endDate: dateEnd,
          idProjectStatusTypeCONCYTEC: activeSubStatus,
          relatedFundingList: selectedFundings
        };

        const updatedProject = [...currentProject, dataProject];
        console.log(updatedProject)

        dispatch(setSelectedProjects(updatedProject));

        navigate('/publicaciones/revision/detalle/' + `${elementID}`)
      } else {
        setError(response.data.message || 'No se pudo registrar el proyecto con su(s) financiamiento(s)');
      }
      
    } catch (error) {
      console.error('Error:', error);
      setError('No se pudo registrar el proyecto con su(s) financiamiento(s)');
    }

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
          {/*
          <CFormSelect  className='mb-3' aria-label="orgunit" label="Unidad organizacional" 
                        value={selectedOptionOrg} onChange={(e) => dispatch(setSelectedOptionOrg(e.target.value))}>
            <option value="">Seleccione una opción</option>
            {NPOrg.map((option) => (
              <option  key={option.value} value={option.label}>
                {option.label}
              </option>
            ))}
          </CFormSelect>
          */}
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

          <div className='text-body-secundary mt-3 mb-1'>¿Forma parte del grupo de investigadores a cargo del proyecto?</div>
            <CFormCheck inline type="radio" name="inlineRadioOptions1" id="cbParticipatingYes" value="Yes" label="Si" 
                        onChange={handleRadioChangeParticipation} checked={isParticipating === true}/>
            <CFormCheck inline type="radio" name="inlineRadioOptions1" id="cbParticipatingNo" value="No" label="No" 
                        onChange={handleRadioChangeParticipation} checked={isParticipating === false}/>
            {
              (isParticipating) && 
              (
                <CFormSelect  className='my-3' aria-label="orgunit"
                              value={selectedPersonalRole || ""} onChange={handleSelectedPersonalRole}>
                  <option value="">Seleccione su rol</option>
                  {ProjectTeamRoles.map((option, indexPTR) => (
                    <option  key={indexPTR} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </CFormSelect>
              )
            }
            

          <div className='text-body-secundary mt-3 mb-1'>¿Desea añadir a los demás investigadores a cargo del proyecto?</div>
            <CFormCheck inline type="radio" name="inlineRadioOptions2" id="cbTeamYes" value="Yes" label="Si" 
                        onChange={handleRadioChangeTeam} checked={isTeam === true}/>
            <CFormCheck inline type="radio" name="inlineRadioOptions2" id="cbTeamNo" value="No" label="No" 
                        onChange={handleRadioChangeTeam} checked={isTeam === false}/>
          {
            (isTeam) && 
            (
              <>
                <div className='text-body-secundary mt-3 mb-1'>Investigadores a cargo del proyecto</div>
                {
                  selectedTP.length > 0 ?
                    selectedTP.map((TP, index) => (
                      <CRow className="align-items-end" key={index}>
                        <CCol>
                          <li>{TP.firstNames} {TP.familyNames}</li>
                        </CCol>
                        <CCol sm={4}>
                          <CFormSelect aria-label="TPPR" value={selectedTPPR} onChange={(e) => handleSelectedTPPersonalRole(e, TP)}>
                            <option value="">Seleccione su rol</option>
                            {ProjectTeamRoles.map((option, indexPTR) => (
                              <option  key={indexPTR} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </CFormSelect>
                        </CCol>
                      </CRow>
                    ))
                    :
                    teamProject.slice(1).map((TPP, indexTPP) =>(
                      <li key={indexTPP}>{TPP.personName} - {TPP.idPersonRole}</li>
                    ))
                }
                <PersonFilter onAction={handleSelectionOfTeam}/>
              </>
            )
          }

          {/* NO SE SI ES NECESARIO */}
          <div className='text-body-secundary mt-3 mb-1'>¿El proyecto se encuentra financiado?</div>
          <CFormCheck inline type="radio" name="inlineRadioOptions3" id="cbRProjectYes" value="Yes" label="Si" 
                      onChange={handleRadioChangeFunding} checked={isProjectFunded === true}/>
          <CFormCheck inline type="radio" name="inlineRadioOptions3" id="cbRProjectNo" value="No" label="No" 
                      onChange={handleRadioChangeFunding} checked={isProjectFunded === false}/>

        </CCardBody>
      </CCard>

      {/* PROJECTS */}
      {
        isProjectFunded &&
        (
          <TabsSP SPID={elementID} typeTab={"funding"} data={selectedFundings}/>
        )
      }

      {/* FINISH REV */}

      <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3 mb-4">
        <CButton color="primary" variant="outline" className="me-md-2" onClick={() =>navigate(-1)}>Cancelar</CButton>
        <CButton color="primary" disabled={selectedFundings.length > 0 ? false : isProjectFunded} onClick={handleProjectData}>Guardar</CButton>
      </div>

    </>
  )
}

export default NewProject