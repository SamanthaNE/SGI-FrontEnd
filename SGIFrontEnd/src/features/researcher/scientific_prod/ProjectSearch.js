import React, { useState } from 'react'
import ProjectsFilter from '../../../components/filters/ProjectsFilter'
import { CButton, CCol, CRow } from '@coreui/react'
import InfoSPCheck from '../../../components/cards/InfoSPCheck'
import { useNavigate, useParams } from 'react-router-dom'
import { dataProjectSearch } from '../../../data_files/HardData'
import { HeadersProject } from '../../../data_files/HeadersProject'

const ProjectSearch = () => {
  const { elementID } = useParams()
  const [count, setCount] = useState(0);

  function handleSelection(dataCC) {
    setCount(dataCC.length)
    console.log(dataCC)
  }

  const handleLinkProject = () => {

  }

  const navigate = useNavigate()

  const handleNavigation = () => {
    navigate('/publicaciones/revision/detalle/' + `${elementID}` + '/proyectos/nuevo');
  }

  return (
    <>
      <div className='h4'>Busqueda de proyectos</div>

      <ProjectsFilter />

      <div className='h5'>Resultados ({dataProjectSearch.length}):</div>

      <CRow>
        <CCol>
          <div className="d-grid gap-2 d-md-block mb-3">
            <CButton color="primary" className="me-md-2" onClick={handleNavigation}>Agregar</CButton>
            <CButton color="primary" variant="outline" disabled={count > 0 ? false : true} onClick={handleLinkProject}>Vincular</CButton>
          </div>
        </CCol>
        <CCol className='text-end'>
            <div className='text-body-secondary'>{count} elemento(s) seleccionado(s)</div>
        </CCol>
      </CRow>
      <CRow>
        <CCol className='mb-3'>
          <InfoSPCheck data={dataProjectSearch} headers={HeadersProject} onAction={handleSelection}/>
        </CCol>
      </CRow>
      
    </>
  )
}

export default ProjectSearch