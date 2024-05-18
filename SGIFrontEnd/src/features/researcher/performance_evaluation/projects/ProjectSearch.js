import React from 'react'
import ProjectsFilter from '../../../../components/filters/ProjectsFilter'
import { dataProjectSearch } from '../../../../data_files/HardData'
import { HeadersProjectEval } from '../../../../data_files/HeadersProject'
import InfoSP from '../../../../components/cards/InfoSP'

const ProjectSearch = () => {
  return (
    <>
      <div className='h4'>Proyectos</div>

      <ProjectsFilter performance={true}/>

      <div className='h5'>Resultados ({dataProjectSearch.length}):</div>

      <InfoSP data={dataProjectSearch} headers={HeadersProjectEval} btnnav={"detalle"} detail={true} />
    </>
  )
}

export default ProjectSearch