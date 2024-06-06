import React, { useEffect, useState } from 'react'
import { HeadersSPEval } from '../../../../data_files/HeadersSP'
import InfoSP from '../../../../components/cards/InfoSP'
import PublicationFilter from '../../../../components/filters/PublicationFilter'
import axiosInstance from '../../../../config/HTTPService'
import LoadingSpinner from '../../../../components/spinner/LoadingSpinner'
import { KEYCODE } from '../../../../config/Constants'

const storedUserData = sessionStorage.getItem('user');
let user = null;
if (storedUserData) {
  user = JSON.parse(storedUserData);
}

const PublicationSearch = () => {
  const [dataAPIPublications, setDataAPIPublications] = useState(null);

  // PUBLICATIONS
  useEffect(() => {
    const fetchData = async () => {
      const storedUserData = sessionStorage.getItem('user');
      let user = null;
      if (storedUserData) {
        user = JSON.parse(storedUserData);
      }

      const params = {
        'keyCode': KEYCODE,
        'scopusAuthorId': user.scopusAuthorId ?? 0
      };

      await axiosInstance.get('api/evaluation/publications', { params })
                      .then((response) => {
                        setDataAPIPublications(response.data);
                      })
                      .catch((err) => {
                        let errMsg;
                        (!err.response) ? errMsg = 'No se pudo conectar con el servidor. Verifique su conexión.' : (err.response.code === 404 ? errMsg = "Servicio no disponible. Intenta más tarde." : errMsg = err.response.data.message);
                        console.log(errMsg);
                        setDataAPIPublications({result:[]})
                      });
    }
  
    fetchData();
  }, [])

  return (
    <>
      {/* TITLE */}
      <div className='h4'>Publicaciones</div>

      { dataAPIPublications ?
        ( 
          <>
            {/* FILTERS */}
            <PublicationFilter data={dataAPIPublications.result} performance={true}/>

            {/* HEADER */}
            <div className='h5'>Resultados ({dataAPIPublications.total}):</div>
            
            {/* DYNAMIC DATA */}
            <InfoSP data={dataAPIPublications.result} headers={HeadersSPEval} btnnav={"detalle"} detail={true} />
          </>
        )
        :
        (<LoadingSpinner />)
      }
    </>
  );
}

export default PublicationSearch