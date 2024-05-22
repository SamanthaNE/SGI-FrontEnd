import React from 'react'
import { dataPublications, dataScopusPublication } from '../../../../data_files/HardData'
import { HeadersSPEval } from '../../../../data_files/HeadersSP'
import InfoSP from '../../../../components/cards/InfoSP'
import PublicationFilter from '../../../../components/filters/PublicationFilter'

const PublicationSearch = () => {
  return (
    <>
      {/* TITLE */}
      <div className='h4'>Publicaciones</div>

      {/* FILTERS */}
      <PublicationFilter data={dataPublications} performance={true}/>

      {/* HEADER */}
      <div className='h5'>Resultados ({dataPublications.length}):</div>
      
      {/* DYNAMIC DATA */}
      <InfoSP data={dataPublications} headers={HeadersSPEval} btnnav={"detalle"} detail={true} />
    </>
  )
}

export default PublicationSearch