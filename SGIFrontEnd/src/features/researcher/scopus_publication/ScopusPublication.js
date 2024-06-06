import React, { useEffect, useState } from 'react'
import InfoSP from '../../../components/cards/InfoSP'
import ScopusPubFilter from '../../../components/filters/ScopusPubFilter'
import { HeadersSP } from '../../../data_files/HeadersSP'
import axiosInstance from '../../../config/HTTPService'
import { KEYCODE } from '../../../config/Constants'
import LoadingSpinner from '../../../components/spinner/LoadingSpinner'
import { useSelector } from 'react-redux'

const ScopusPublication = () => {
  const [dataAPI, setDataAPI] = useState(null);
  //const user = useSelector(state => state.user);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('user');
    let user = null;
    if (storedUserData) {
      user = JSON.parse(storedUserData);
    }

    const fetchData = async () => {
        const params = {
          'keyCode': KEYCODE,
          'authid': user.scopusAuthorId ?? 0,
        };
        
        await axiosInstance.get('api/scopus/publicationsauthor', { params })
                          .then((response) => {
                            setDataAPI(response.data);
                          })
                          .catch((err) => {
                            let errMsg;
                            (!err.response) ? errMsg = 'No se pudo conectar con el servidor. Verifique su conexión.' : (err.response.code === 404 ? errMsg = "Servicio no disponible. Intenta más tarde." : errMsg = err.response.data.message);
                            console.log(errMsg);
                            setDataAPI({result:[]})
                          });
    }
  
    fetchData();

  }, [])

  return (
    <>
      {/* TITLE */}
      <div className='h4'>Publicaciones en revisión</div>

      { dataAPI ?
        (
          <>
            {/* FILTERS */}
            <ScopusPubFilter data={dataAPI.result}/>

            {/* HEADER */}
            <div className='h5'>Resultados ({dataAPI.total}):</div>

            {/* DYNAMIC DATA */}
            <InfoSP data={dataAPI.result} headers={HeadersSP} btnnav={"/publicaciones/revision/detalle"} detail={true} />
          </>
        )
        :
        (
          <LoadingSpinner />
        )
      }
      
    </>
  )
}

export default ScopusPublication