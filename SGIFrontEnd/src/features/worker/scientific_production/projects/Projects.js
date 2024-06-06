import React, { useEffect, useState } from 'react'
import ProjectsFilter from '../../../../components/filters/ProjectsFilter'
import { HeadersProjectEval } from '../../../../data_files/HeadersProject'
import InfoSP from '../../../../components/cards/InfoSP'
import LoadingSpinner from '../../../../components/spinner/LoadingSpinner'
import { KEYCODE } from '../../../../config/Constants'
import axiosInstance from '../../../../config/HTTPService'

const Projects = () => {
  const [dataAPIProjects, setDataAPIProjects] = useState(null);

  // PROJECTS
  useEffect(() => {
    const fetchData = async () => {
        const params = {
          'keyCode': KEYCODE,
          'page': 1, // Dinamico?
          'size': 50 // Dinamico?
        };

        await axiosInstance.get('api/scientificprod/projects', { params })
                          .then((response) => {
                            setDataAPIProjects(response.data);
                            console.log(response.data)
                          })
                          .catch((err) => {
                            let errMsg;
                            (!err.response) ? errMsg = 'No se pudo conectar con el servidor. Verifique su conexión.' : (err.response.code === 404 ? errMsg = "Servicio no disponible. Intenta más tarde." : errMsg = err.response.data.message);
                            console.log(errMsg);
                            setDataAPIProjects([])
                          });
    }
  
    fetchData();
  }, [])

  return (
    <>
      <div className='h4'>Proyectos</div>

      {
        dataAPIProjects ?
        (<>
          <ProjectsFilter data={dataAPIProjects.projects} performance={true}/>

          <div className='h5'>Resultados ({dataAPIProjects.total}):</div>

          <InfoSP data={dataAPIProjects.projects ?? []} headers={HeadersProjectEval} btnnav={"detalle"} detail={true} />
        </>)
        :
        (<LoadingSpinner />)
      }      
    </>
  )
}

export default Projects