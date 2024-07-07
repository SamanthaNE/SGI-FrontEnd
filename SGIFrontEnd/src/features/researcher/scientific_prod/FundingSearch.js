import React, { useEffect, useState } from 'react'
import FundingFilter from '../../../components/filters/FundingFilter'
import { CButton, CCol, CRow } from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import HeadersFunding from '../../../data_files/HeadersFunding'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedFundings } from '../../../redux/slices/curationSlice'
import { KEYCODE } from '../../../config/Constants'
import axiosInstance from '../../../config/HTTPService'
import { getUserFromSessionStorage } from '../../../utils/userUtils'
import LoadingSpinner from '../../../components/spinner/LoadingSpinner'
import InfoFundingCheck from '../../../components/cards/InfoFundingCheck'

const user = getUserFromSessionStorage();

const FundingSearch = () => {
  const { elementID } = useParams()
  const navigate = useNavigate()
  const { selectedFundings } = useSelector((state) => state.curation.newProject)

  const [selectedFundingsLocal, setSelectedFundingsLocal] = useState(selectedFundings);

  const [filtersData, setFiltersData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [dataAPIProjects, setDataAPIProjects] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const params = {
        'keyCode': KEYCODE,
        'idProject': 0,
        'idPerson': user.idPerson ?? 0,
        'title': filtersData ? filtersData.title : null,
        'identifier': filtersData? filtersData.identifier : null,
        'orgUnit': filtersData ? filtersData.orgUnit : null,
        'fundingType': filtersData ? filtersData.fundingType : null
      };

      console.log(params)
      await axiosInstance.get('api/evaluation/funding', { params })
                        .then((response) => {
                          setDataAPIProjects(response.data);
                        })
                        .catch((err) => {
                          let errMsg;
                          (!err.response) ? errMsg = 'No se pudo conectar con el servidor. Verifique su conexión.' : (err.response.code === 404 ? errMsg = "Servicio no disponible. Intenta más tarde." : errMsg = err.response.data.message);
                          console.log(errMsg);
                          setDataAPIProjects({result:[]})
                        })
                        .finally(() =>{
                          setIsLoading(false);
                        });
    }
  
    fetchData();
  }, [filtersData])

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
  
  const handleFilters = (filters) => {
    setFiltersData(filters);
  }

  return (
    <>
      <div className='h4'>Busqueda de financiamientos</div>

      <FundingFilter onAction={handleFilters}/>
      
      {
        isLoading ?
        (<LoadingSpinner />)
        :
        (
          dataAPIProjects ?
          (<>
              <div className='h5'>Resultados ({dataAPIProjects.total}):</div>
  
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
                  <InfoFundingCheck data={dataAPIProjects.result} headers={HeadersFunding} onAction={handleSelection}/>
                </CCol>
              </CRow>
          </>)
          :
          (<LoadingSpinner />)
        )
      }
    </>
  )
}

export default FundingSearch