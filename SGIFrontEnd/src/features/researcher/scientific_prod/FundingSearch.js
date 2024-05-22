import React, { useState } from 'react'
import FundingFilter from '../../../components/filters/FundingFilter'
import { CButton, CCol, CRow } from '@coreui/react'
import InfoSPCheck from '../../../components/cards/InfoSPCheck'
import { useNavigate, useParams } from 'react-router-dom'
import HeadersFunding from '../../../data_files/HeadersFunding'
import { dataFundingSearch } from '../../../data_files/HardData'
import { useDispatch } from 'react-redux'
import { setSelectedFundings } from '../../../redux/slices/curationSlice'

const FundingSearch = () => {
  const { elementID } = useParams()
  const navigate = useNavigate()
  const [selectedFundingsLocal, setSelectedFundingsLocal] = useState([]);

  /* REDUX */
  const dispatch = useDispatch();

  const handleSelection = (dataCC) => {
    console.log(dataCC)
    setSelectedFundingsLocal(dataCC)
  }

  const handleLinkFunding = () => {
    dispatch(setSelectedFundings(selectedFundingsLocal));
    navigate(-1)
  }

  const handleNavigation = () => {
    navigate('/publicaciones/revision/detalle/' + `${elementID}` + '/proyectos/nuevo/financiamiento/nuevo');
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
            <CButton color="primary" variant="outline" disabled={selectedFundingsLocal.length === 0} onClick={handleLinkFunding}>Vincular</CButton>
          </div>
        </CCol>
        <CCol className='text-end'>
            <div className='text-body-secondary'>{selectedFundingsLocal.length} elemento(s) seleccionado(s)</div>
        </CCol>
      </CRow>
        
      <CRow>
        <CCol className='mb-3'>
          <InfoSPCheck data={dataFundingSearch} headers={HeadersFunding} onAction={handleSelection}/>
        </CCol>
      </CRow>
    </>
  )
}

export default FundingSearch