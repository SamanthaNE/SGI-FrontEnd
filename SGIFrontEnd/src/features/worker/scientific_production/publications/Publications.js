import React, { useEffect, useState } from 'react'
import PublicationFilter from '../../../../components/filters/PublicationFilter'
import { dataPublications } from '../../../../data_files/HardData'
import { HeadersSPEval } from '../../../../data_files/HeadersSP'
import InfoSP from '../../../../components/cards/InfoSP'
import { KEYCODE } from '../../../../config/Constants'
import axiosInstance from '../../../../config/HTTPService'
import LoadingSpinner from '../../../../components/spinner/LoadingSpinner'

const Publications = () => {
  const [dataAPIPublications, setDataAPIPublications] = useState(null);

  const [filtersData, setFiltersData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // PUBLICATIONS
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const params = {
        'keyCode': KEYCODE,
        'page': 1, // Dinamico?
        'size': 30, // Dinamico?
        'title': filtersData ? filtersData.title : null,
        'publishedIn': filtersData ? filtersData.publishedIn : null,
        'resourceType': filtersData ? filtersData.resourceType : null,
        'year': filtersData ? filtersData.year : null,
        'author': filtersData ? filtersData.author : null
      };

      await axiosInstance.get('api/scientificprod/publications', { params })
                      .then((response) => {
                        setDataAPIPublications(response.data);
                      })
                      .catch((err) => {
                        let errMsg;
                        (!err.response) ? errMsg = 'No se pudo conectar con el servidor. Verifique su conexión.' : (err.response.code === 404 ? errMsg = "Servicio no disponible. Intenta más tarde." : errMsg = err.response.data.message);
                        console.log(errMsg);
                        setDataAPIPublications({result:[]})
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
      <div className='h4'>Publicaciones</div>

      {
        isLoading ?
        (<LoadingSpinner />)
        :
        (
          dataAPIPublications ?
          (<>
            {/* FILTERS */}
            <PublicationFilter onAction={handleFilters} performance={true}/>
  
            {/* HEADER */}
            <div className='h5'>Resultados ({dataAPIPublications.total}):</div>
  
            {/* DYNAMIC DATA */}
            <InfoSP data={dataAPIPublications.publications ?? []} headers={HeadersSPEval} btnnav={"detalle"} detail={true} />
          </>)
          :
          (<LoadingSpinner />)
        )
      }
      
    </>
  )
}

export default Publications