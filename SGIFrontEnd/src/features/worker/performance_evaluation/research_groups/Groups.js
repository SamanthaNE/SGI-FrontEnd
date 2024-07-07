import React, { useEffect, useState } from 'react'
import { dataGroups } from '../../../../data_files/HardData'
import GroupsFilter from '../../../../components/filters/GroupsFilter'
import { HeadersGroupsEval } from '../../../../data_files/HeadersSP'
import InfoGroupWorker from '../../../../components/cards/InfoGroupWorker'
import { KEYCODE } from '../../../../config/Constants'
import axiosInstance from '../../../../config/HTTPService'
import LoadingSpinner from '../../../../components/spinner/LoadingSpinner'

const Groups = () => {
  const [dataAPIGroups, setDataAPIGroups] = useState(null);
  const [filtersData, setFiltersData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  // RESEARCH GROUPS
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const params = {
        'keyCode': KEYCODE,
        'page': 1,
        'size': 50,
        'nameGroup': filtersData ? filtersData.nameGroup : null,
        'category': filtersData ? filtersData.category : null
      };

      await axiosInstance.get('api/researchgroups/list', { params })
                        .then((response) => {
                          setDataAPIGroups(response.data);
                        })
                        .catch((err) => {
                          let errMsg;
                          (!err.response) ? errMsg = 'No se pudo conectar con el servidor. Verifique su conexión.' : (err.response.code === 404 ? errMsg = "Servicio no disponible. Intenta más tarde." : errMsg = err.response.data.message);
                          console.log(errMsg);
                          setDataAPIGroups({result:[]})
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
      <div className='h4'>Grupos de investigación</div>
      {
        isLoading ?
        (<LoadingSpinner />)
        :
        (
          dataAPIGroups ?
          (<>
            <GroupsFilter onAction={handleFilters}/>
  
            <div className='h5'>Resultados ({dataAPIGroups.total}):</div>
  
            <InfoGroupWorker data={dataAPIGroups.researchGroup ?? []} headers={HeadersGroupsEval} btnnav={"detalle"} detail={true} />
          </>)
          :
          (<LoadingSpinner />)
        )
      }
    </>
  )
}

export default Groups