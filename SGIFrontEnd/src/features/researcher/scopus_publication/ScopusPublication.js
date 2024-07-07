import React, { useEffect, useState } from 'react'
import InfoSP from '../../../components/cards/InfoSP'
import ScopusPubFilter from '../../../components/filters/ScopusPubFilter'
import { HeadersSP } from '../../../data_files/HeadersSP'
import axiosInstance from '../../../config/HTTPService'
import { KEYCODE } from '../../../config/Constants'
import LoadingSpinner from '../../../components/spinner/LoadingSpinner'
import { useSelector } from 'react-redux'
import ErrorNotification from '../../../components/cards/ErrorNotification'

const ScopusPublication = () => {
  const [dataAPI, setDataAPI] = useState(null);
  const [error, setError] = useState(false)

  const [filtersData, setFiltersData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('user');
    let user = null;
    if (storedUserData) {
      user = JSON.parse(storedUserData);
    }

    const fetchData = async () => {
      setIsLoading(true);

      const params = {
        'keyCode': KEYCODE,
        'authid': user.scopusAuthorId ?? 0,
        'title': filtersData ? filtersData.title : null,
        'year': filtersData ? filtersData.year : null,
        'author': filtersData ? filtersData.author : null,
        'publisher': filtersData ? filtersData.publisher : null,
        'aggregationType': filtersData ? filtersData.aggregationType : null,
        'subTypeDescription': filtersData ? filtersData.subTypeDescription : null
      };
      
      await axiosInstance.get('api/scopus/publicationsauthor', { params })
                        .then((response) => {
                          setDataAPI(response.data);
                        })
                        .catch((err) => {
                          let errMsg;
                          (!err.response) ? errMsg = 'No se pudo conectar con el servidor. Verifique su conexión.' : (err.response.code === 404 ? errMsg = "Servicio no disponible. Intenta más tarde." : errMsg = err.response.data.message);
                          setError(true)
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
      {/* TITLE */}
      <div className='h4'>Publicaciones en revisión</div>

      { isLoading ?
        (<LoadingSpinner />)
        :
        (
          dataAPI ?
          (
            <>
              {/* FILTERS */}
              <ScopusPubFilter onAction={handleFilters}/>
  
              {/* HEADER */}
              <div className='h5'>Resultados ({dataAPI.total}):</div>
  
              {/* DYNAMIC DATA */}
              <InfoSP data={dataAPI.result} headers={HeadersSP} btnnav={"/publicaciones/revision/detalle"} detail={true} />
            </>
          )
          :
          (
            error ?
            (<ErrorNotification/>)
            :
            (<LoadingSpinner />)
          )
        )
      }
      
    </>
  )
}

export default ScopusPublication