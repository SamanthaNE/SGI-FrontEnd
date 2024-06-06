import React, { useEffect, useState } from 'react'
import ProjectsFilter from '../../../components/filters/ProjectsFilter'
import { CButton, CCol, CRow } from '@coreui/react'
import InfoSPCheck from '../../../components/cards/InfoSPCheck'
import { useNavigate, useParams } from 'react-router-dom'
import { dataProjectSearch } from '../../../data_files/HardData'
import { HeadersProject } from '../../../data_files/HeadersProject'
import { setSelectedProjects } from '../../../redux/slices/curationSlice'
import { useDispatch } from 'react-redux'
import { getUserFromSessionStorage } from '../../../utils/userUtils'
import { KEYCODE } from '../../../config/Constants'
import axiosInstance from '../../../config/HTTPService'
import LoadingSpinner from '../../../components/spinner/LoadingSpinner'

const user = getUserFromSessionStorage();

const ProjectSearch = () => {
  const navigate = useNavigate()
  const { elementID } = useParams()
  const [selectedProjectsLocal, setSelectedProjectsLocal] = useState([]);

  const [dataAPIProjects, setDataAPIProjects] = useState(null);

  // PROJECTS
  useEffect(() => {
    const fetchData = async () => {
        const params = {
          'keyCode': KEYCODE,
          'idPerson': user.idPerson ?? 0
        };

        await axiosInstance.get('api/evaluation/projects', { params })
                          .then((response) => {
                            setDataAPIProjects(response.data);
                            console.log(response.data)
                          })
                          .catch((err) => {
                            let errMsg;
                            (!err.response) ? errMsg = 'No se pudo conectar con el servidor. Verifique su conexión.' : (err.response.code === 404 ? errMsg = "Servicio no disponible. Intenta más tarde." : errMsg = err.response.data.message);
                            console.log(errMsg);
                            setDataAPIProjects({result:[]})
                          });
    }
  
    fetchData();
  }, [])

  /* REDUX */
  const dispatch = useDispatch();

  const handleSelection = (dataCC) => {
    setSelectedProjectsLocal(dataCC)
  }

  const handleLinkProject = () => {
    dispatch(setSelectedProjects(selectedProjectsLocal));
    navigate(-1)
  }

  const handleNavigation = () => {
    navigate('/publicaciones/revision/detalle/' + `${elementID}` + '/proyectos/nuevo');
  }

  return (
    <>
      <div className='h4'>Busqueda de proyectos</div>

      {
        dataAPIProjects ?
        (<>
            <ProjectsFilter data={dataAPIProjects.result}/>

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
                <InfoSPCheck data={dataAPIProjects.result} headers={HeadersProject} onAction={handleSelection}/>
              </CCol>
            </CRow>
        </>)
        :
        (<LoadingSpinner />)
      }      
    </>
  )
}

export default ProjectSearch