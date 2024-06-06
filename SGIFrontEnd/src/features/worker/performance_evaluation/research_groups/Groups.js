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
  // RESEARCH GROUPS
  useEffect(() => {
    const fetchData = async () => {

        const params = {
          'keyCode': KEYCODE,
          'page': 1,
          'size': 50
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
                          });
    }
  
    fetchData();
  }, [])

  return (
    <>
      <div className='h4'>Grupos de investigación</div>
      {
        dataAPIGroups ?
        (<>
          <GroupsFilter />

          <div className='h5'>Resultados ({dataAPIGroups.total}):</div>

          <InfoGroupWorker data={dataAPIGroups.researchGroup ?? []} headers={HeadersGroupsEval} btnnav={"detalle"} detail={true} />
        </>)
        :
        (<LoadingSpinner />)
        }
    </>
  )
}

export default Groups