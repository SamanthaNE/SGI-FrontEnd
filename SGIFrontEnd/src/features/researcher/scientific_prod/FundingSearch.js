import React, { useState } from 'react'
import FundingFilter from '../../../components/filters/FundingFilter'
import { CButton, CCol, CRow } from '@coreui/react'
import InfoSPCheck from '../../../components/cards/InfoSPCheck'
import { useNavigate } from 'react-router-dom'
import HeadersFunding from '../../../data_files/HeadersFunding'
import { dataFundingSearch } from '../../../data_files/HardData'

const FundingSearch = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate()

  function handleSelection(dataCC) {
    setCount(dataCC.length)
  }

  const handleNavigation = () => {
    navigate('/publicaciones/revision/detalle/proyectos/nuevo/financiamiento/nuevo');
  }

  return (
    <>
      <div className='h4'>Busqueda de financiamientos</div>

      <FundingFilter />

      <div className='h5'>Resultados ({dataFundingSearch.length}):</div>

      <CRow>
        <CCol>
          <div className="d-grid gap-2 d-md-block mb-3">
            <CButton color="primary" className="me-md-2" onClick={handleNavigation}>Agregar</CButton>
            <CButton color="primary" variant="outline" disabled={count > 0 ? false : true} /*onClick={}*/>Vincular</CButton>
          </div>
        </CCol>
        <CCol className='text-end'>
            <div className='text-body-secondary'>{count} elemento(s) seleccionado(s)</div>
        </CCol>
      </CRow>
        
      <InfoSPCheck data={dataFundingSearch} headers={HeadersFunding} onAction={handleSelection}/>
    </>
  )
}

export default FundingSearch