import React from 'react'
import ScopusPubFilter from '../../../../components/filters/ScopusPubFilter'
import { dataScopusPublication } from '../../../../data_files/HardData'
import { HeadersSPEval } from '../../../../data_files/HeadersSP'
import InfoSP from '../../../../components/cards/InfoSP'

const PublicationSearch = () => {
  return (
    <>
      {/* TITLE */}
      <div className='h4'>Publicaciones</div>

      {/* FILTERS */}
      <ScopusPubFilter data={dataScopusPublication} performance={true}/>

      {/* HEADER */}
      <div className='h5'>Resultados ({dataScopusPublication.length}):</div>
      
      {/* DYNAMIC DATA */}
      <InfoSP data={dataScopusPublication} headers={HeadersSPEval} btnnav={"detalle"} detail={true} />
    </>
  )
}

export default PublicationSearch