import React, { useEffect, useState } from 'react'
import ProjectsFilter from '../../../../components/filters/ProjectsFilter'
import { HeadersProjectEval } from '../../../../data_files/HeadersProject'
import InfoSP from '../../../../components/cards/InfoSP'
import LoadingSpinner from '../../../../components/spinner/LoadingSpinner'
import { KEYCODE } from '../../../../config/Constants'
import axiosInstance from '../../../../config/HTTPService'

const Projects = () => {
  const [dataAPIProjects, setDataAPIProjects] = useState(null);

  const [filtersData, setFiltersData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // PROJECTS
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const params = {
        'keyCode': KEYCODE,
        'page': 1, // Dinamico?
        'size': 50, // Dinamico?
        'title': filtersData ? filtersData.title : null,
        'status': filtersData ? filtersData.status : null,
        'startDate': filtersData ? filtersData.startDate : null,
        'endDate': filtersData ? filtersData.endDate : null,
        'fundingType': filtersData ? filtersData.fundingType : null,
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
                        })
                        .finally(() =>{
                          setIsLoading(false);
                        });
    }
  
    fetchData();
  }, [filtersData])

  const handleFilters = (filters) => {
    setFiltersData(filters);
  }

  return (
    <>
      <div className='h4'>Proyectos</div>

      {
        isLoading ?
        (<LoadingSpinner />)
        :
        (
          dataAPIProjects ?
          (<>
            <ProjectsFilter onAction={handleFilters} performance={true}/>
  
            <div className='h5'>Resultados ({dataAPIProjects.total}):</div>
  
            <InfoSP data={dataAPIProjects.projects ?? []} headers={HeadersProjectEval} btnnav={"detalle"} detail={true} />
          </>)
          :
          (<LoadingSpinner />)
        )
      }      
    </>
  )
}

export default Projects