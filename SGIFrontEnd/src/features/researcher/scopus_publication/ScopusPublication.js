import React from 'react'
import InfoSP from '../../../components/cards/InfoSP'
import ScopusPubFilter from '../../../components/filters/ScopusPubFilter'
import { dataScopusPublication } from '../../../data_files/HardData'
import { HeadersSP } from '../../../data_files/HeadersSP'

const ScopusPublication = () => {

  return (
    <>
      {/* TITLE */}
      <div className='h4'>Publicaciones en revisión</div>

      {/* FILTERS */}
      <ScopusPubFilter data={dataScopusPublication}/>

      {/* HEADER */}
      <div className='h5'>Resultados ({dataScopusPublication.length}):</div>
      
      {/* DYNAMIC DATA */}
      <InfoSP data={dataScopusPublication} headers={HeadersSP} btnnav={"/publicaciones/revision/detalle"} detail={true} />
    </>
  )
}

export default ScopusPublication