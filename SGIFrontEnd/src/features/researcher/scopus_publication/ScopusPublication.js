import React from 'react'
import InfoSP from '../../../components/cards/InfoSP'
import { CCol, CRow } from '@coreui/react'
import ScopusPubFilter from '../../../components/filters/ScopusPubFilter'
import HeadersSP from '../../../data_files/HeadersSP'
import { dataScopusPublication } from '../../../data_files/HardData'

const ScopusPublication = () => {

  return (
    <>
      {/* TITLE */}
      <div className='h4'>Publicaciones en revisión</div>

      {/* FILTERS */}
      <ScopusPubFilter />

      {/* HEADER */}
      <div className='h5'>Resultados ({dataScopusPublication.length}):</div>
      
      {/* DYNAMIC DATA */}
      <InfoSP data={dataScopusPublication} headers={HeadersSP} btnnav={"/publicaciones/revision/detalle"} detail={true} />
    </>
  )
}

export default ScopusPublication