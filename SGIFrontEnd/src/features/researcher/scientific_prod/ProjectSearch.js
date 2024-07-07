import React, { useEffect, useState } from 'react'
import ProjectsFilter from '../../../components/filters/ProjectsFilter'
import { CButton, CCol, CRow } from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { HeadersProject } from '../../../data_files/HeadersProject'
import { setSelectedProjects } from '../../../redux/slices/curationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getUserFromSessionStorage } from '../../../utils/userUtils'
import { KEYCODE } from '../../../config/Constants'
import axiosInstance from '../../../config/HTTPService'
import LoadingSpinner from '../../../components/spinner/LoadingSpinner'
import InfoProjectCheck from '../../../components/cards/InfoProjectCheck'

const user = getUserFromSessionStorage();

const ProjectSearch = () => {
  const navigate = useNavigate()
  const { elementID } = useParams()
  const [selectedProjectsLocal, setSelectedProjectsLocal] = useState([]);

  const [dataAPIProjects, setDataAPIProjects] = useState(null);

  const [filtersData, setFiltersData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // PROJECTS
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const params = {
        'keyCode': KEYCODE,
        'idPerson': user.idPerson ?? 0,
        'title': filtersData ? filtersData.title : null,
        'status': filtersData ? filtersData.status : null,
        'startDate': filtersData ? filtersData.startDate : null,
        'endDate': filtersData ? filtersData.endDate : null,
        'fundingType': filtersData ? filtersData.fundingType : null,
      };

      await axiosInstance.get('api/evaluation/projects', { params })
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
  const { selectedProjects } = useSelector((state) => state.curation)

  const handleSelection = (dataCC) => {
    setSelectedProjectsLocal(dataCC)
  }

  const handleLinkProject = () => {
    const updatedProjects = [...selectedProjects, ...selectedProjectsLocal];

    dispatch(setSelectedProjects(updatedProjects));
    navigate(-1)
  }

  const handleNavigation = () => {
    navigate('/publicaciones/revision/detalle/' + `${elementID}` + '/proyectos/nuevo');
  }

  const handleFilters = (filters) => {
    setFiltersData(filters);
  }

  return (
    <>
      <div className='h4'>Busqueda de proyectos</div>

      {
        isLoading ?
        (<LoadingSpinner />)
        :
        (
          dataAPIProjects ?
          (<>
              <ProjectsFilter onAction={handleFilters}/>

              <div className='h5'>Resultados ({dataAPIProjects.total}):</div>

              <CRow>
                <CCol>
                  <div className="d-grid gap-2 d-md-block mb-3">
                    <CButton color="primary" className="me-md-2" onClick={handleNavigation}>Agregar</CButton>
                    <CButton color="primary" variant="outline" disabled={selectedProjectsLocal.length === 0} onClick={handleLinkProject}>Vincular</CButton>
                  </div>
                </CCol>
                <CCol className='text-end'>
                    <div className='text-body-secondary'>{selectedProjectsLocal.length} elemento(s) seleccionado(s)</div>
                </CCol>
              </CRow>
              <CRow>
                <CCol className='mb-3'>
                  <InfoProjectCheck data={dataAPIProjects.result} headers={HeadersProject} onAction={handleSelection}/>
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

export default ProjectSearch