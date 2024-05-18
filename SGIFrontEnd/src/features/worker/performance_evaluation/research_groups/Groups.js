import React from 'react'
import { dataGroups } from '../../../../data_files/HardData'
import GroupsFilter from '../../../../components/filters/GroupsFilter'
import { HeadersGroupsEval } from '../../../../data_files/HeadersSP'
import InfoGroupWorker from '../../../../components/cards/InfoGroupWorker'

const Groups = () => {
  return (
    <>
      <div className='h4'>Grupos de investigación</div>

      <GroupsFilter />

      <div className='h5'>Resultados ({dataGroups.length}):</div>

      <InfoGroupWorker data={dataGroups} headers={HeadersGroupsEval} btnnav={"detalle"} detail={true} />
    </>
  )
}

export default Groups