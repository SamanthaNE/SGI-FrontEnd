import React, { useEffect, useState } from 'react'
import { dataProjectSearch, dataSelectedPublication } from '../../../../data_files/HardData'
import { useParams } from 'react-router-dom'
import AccordionInfo from '../../../../components/accordion/AccordionInfo'
import InfoPublication from '../../../../components/cards/InfoPublicationDetail'
import { KEYCODE } from '../../../../config/Constants'
import axiosInstance from '../../../../config/HTTPService'
import LoadingSpinner from '../../../../components/spinner/LoadingSpinner'
import ErrorNotification from '../../../../components/cards/ErrorNotification'

 {/* CON LA API VA SIN [elementID - 1] */}

const PublicationDetail = () => {
  const { elementID } = useParams();
  const [dataAPIPublication, setDataAPIPublication] = useState(null);
  const [error, setError] = useState(false);

  // PUBLICATIONS
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        'keyCode': KEYCODE,
        'publicationId': elementID
      };

      await axiosInstance.get('api/scientificprod/publicationdetail', { params })
                    .then((response) => {
                      setDataAPIPublication(response.data.publicationDetail);
                    })
                    .catch((err) => {
                      setError(true);
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
      dataAPIPublication ? 
      (<>
        <div className='h4'>{dataAPIPublication.title}</div>

        <InfoPublication data={dataAPIPublication}/>

        <AccordionInfo title={'Proyectos'} data={dataAPIPublication.relatedProjects}/>
      </>)
      :
      (
        error ?
        (<ErrorNotification/>)
        :
        (<LoadingSpinner />)
      )
    }
    </>
  )
}

export default PublicationDetail