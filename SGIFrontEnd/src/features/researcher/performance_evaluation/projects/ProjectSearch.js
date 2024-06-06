import React, { useEffect, useState } from 'react'
import ProjectsFilter from '../../../../components/filters/ProjectsFilter'
import { dataProjectSearch } from '../../../../data_files/HardData'
import { HeadersProjectEval } from '../../../../data_files/HeadersProject'
import InfoSP from '../../../../components/cards/InfoSP'
import { KEYCODE } from '../../../../config/Constants'
import axiosInstance from '../../../../config/HTTPService'
import LoadingSpinner from '../../../../components/spinner/LoadingSpinner'

const ProjectSearch = () => {
  const [dataAPIProjects, setDataAPIProjects] = useState(null);

  // PROJECTS
  useEffect(() => {
    const storedUserData = sessionStorage.getItem('user');
    let user = null;
    if (storedUserData) {
      user = JSON.parse(storedUserData);
    }

    const fetchData = async () => {
        const params = {
          'keyCode': KEYCODE,
          'idPerson': user.idPerson ?? 0
        };

        await axiosInstance.get('api/evaluation/projects', { params })
                          .then((response) => {
                            setDataAPIProjects(response.data);
                          })
                          .catch((err) => {
                            let errMsg;
                            (!err.response) ? errMsg = 'No se pudo conectar con el servidor. Verifique su conexión.' : (err.response.code === 404 ? errMsg = "Servicio no disponible. Intenta más tarde." : errMsg = err.response.data.message);
                            console.log(errMsg);
                            setDataAPIProjects({result:[]})
                          });
    }
  
    fetchData();
  }, [])

  return (
    <>
      <div className='h4'>Proyectos</div>

      {dataAPIProjects ?
        (
          <>
            <ProjectsFilter data={dataAPIProjects.result} performance={true}/>

            <div className='h5'>Resultados ({dataAPIProjects.total}):</div>

            <InfoSP data={dataAPIProjects.result} headers={HeadersProjectEval} btnnav={"detalle"} detail={true} />
          </>
        )
        :
        (<LoadingSpinner />)
      }
    </>
  )
}

export default ProjectSearch