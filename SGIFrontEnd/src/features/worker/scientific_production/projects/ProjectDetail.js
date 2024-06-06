import React, { useEffect, useState } from 'react'
import { dataSelectedProject } from '../../../../data_files/HardData'
import { useParams } from 'react-router-dom'
import AccordionInfo from '../../../../components/accordion/AccordionInfo'
import InfoProjectDetail from '../../../../components/cards/InfoProjectDetail'
import { KEYCODE } from '../../../../config/Constants'
import LoadingSpinner from '../../../../components/spinner/LoadingSpinner'
import axiosInstance from '../../../../config/HTTPService'

 {/* CON LA API VA SIN [elementID - 1] */}

const ProjectDetail = () => {
  const { elementID } = useParams()
  const [dataAPIProject, setDataAPIProject] = useState(null);

  // PROJECTS
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        'keyCode': KEYCODE,
        'idProject': elementID
      };

      await axiosInstance.get('api/scientificprod/projectdetail', { params })
                  .then((response) => {
                    setDataAPIProject(response.data.projectDetailDto);
                  })
                  .catch((err) => {
                    let errMsg;
                    (!err.response) ? errMsg = 'No se pudo conectar con el servidor. Verifique su conexión.' : (err.response.code === 404 ? errMsg = "Servicio no disponible. Intenta más tarde." : errMsg = err.response.data.message);
                    console.log(errMsg);
                  });
    }
  
    fetchData();
  }, [])

  return (
    <>
    {
      dataAPIProject ?
      (<>
        <div className='h4'>{dataAPIProject.title}</div>

        <InfoProjectDetail data={dataAPIProject} />

        <AccordionInfo title={'Financiamientos'} data={dataAPIProject.relatedFundingList}/>
      </>)
      :
      (<LoadingSpinner />)
    }
    </>
  )
}

export default ProjectDetail