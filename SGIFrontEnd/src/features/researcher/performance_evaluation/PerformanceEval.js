import { CCard, CCardBody, CCardGroup } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import InfoSP from '../../../components/cards/InfoSP';
import { HeadersGroupsEval, HeadersSPEval } from '../../../data_files/HeadersSP';
import { HeadersProjectEval } from '../../../data_files/HeadersProject';
import { dataGroups, dataProjectSearch, dataPublications } from '../../../data_files/HardData';
import { KEYCODE } from '../../../config/Constants';
import axiosInstance from '../../../config/HTTPService';
import LoadingSpinner from '../../../components/spinner/LoadingSpinner';

const PerformanceEval = () => {
  const [selectedCard, setSelectedCard] = useState('publications');

  const handleCardClick = (cardType) => {
    setSelectedCard(cardType);
  };

  const storedUserData = sessionStorage.getItem('user');
  let user = null;
  if (storedUserData) {
    user = JSON.parse(storedUserData);
  }

  const [dataAPIPublications, setDataAPIPublications] = useState(null);
  const [dataAPIProjects, setDataAPIProjects] = useState(null);
  const [dataAPIGroups, setDataAPIGroups] = useState(null);
  const [dataTotalFunding, setDataTotalFunding] = useState(null);

  // PUBLICATIONS
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        'keyCode': KEYCODE,
        'scopusAuthorId': user.scopusAuthorId ?? 0
      };

      await axiosInstance.get('api/evaluation/publications', { params })
                        .then((response) => {
                          setDataAPIPublications(response.data);
                        })
                        .catch((err) => {
                          let errMsg;
                          (!err.response) ? errMsg = 'No se pudo conectar con el servidor. Verifique su conexión.' : (err.response.code === 404 ? errMsg = "Servicio no disponible. Intenta más tarde." : errMsg = err.response.data.message);
                          console.log(errMsg);
                          setDataAPIPublications({result:[]})
                        });
    }
  
    fetchData();
  }, [])

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
                            setDataTotalFunding(response.data.result.filter(project => project.relatedFundingList && project.relatedFundingList.length > 0).length)
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

  // RESEARCH GROUPS
  useEffect(() => {
    const fetchData = async () => {

        const params = {
          'keyCode': KEYCODE,
          'idPerson': user.idPerson ?? 0
        };

        await axiosInstance.get('api/evaluation/researchgroups', { params })
                          .then((response) => {
                            setDataAPIGroups(response.data);
                          })
                          .catch((err) => {
                            let errMsg;
                            (!err.response) ? errMsg = 'No se pudo conectar con el servidor. Verifique su conexión.' : (err.response.code === 404 ? errMsg = "Servicio no disponible. Intenta más tarde." : errMsg = err.response.data.message);
                            console.log(errMsg);
                            setDataAPIGroups({result:[]})
                          });
    }
  
    fetchData();
  }, [])

  return (
    <>
      <div className='h4'>Evaluación de desempeño</div>
      <CCardGroup className='mt-3 mb-5'>
        <CCard className='mx-2 rounded' onClick={() => handleCardClick('publications')} color={selectedCard === 'publications' ? 'primary' : ''} textColor={selectedCard === 'publications' ? 'white' : 'black'}>
          <CCardBody>
            <div className='h4 text-center'>Publicaciones</div>
            <div className='h1 text-center'>{dataAPIPublications ? dataAPIPublications.total : "..."}</div>
          </CCardBody>
        </CCard>
        <CCard className='mx-2 rounded' onClick={() => handleCardClick('groups')} color={selectedCard === 'groups' ? 'primary' : ''} textColor={selectedCard === 'groups' ? 'white' : 'black'}>
          <CCardBody>
            <div className='h4 text-center'>Grupos de investigación</div>
            <div className='h1 text-center'>{dataAPIGroups ? dataAPIGroups.total : "..."}</div>
          </CCardBody>
        </CCard>
        <CCard className='mx-2 rounded' onClick={() => handleCardClick('projects')} color={selectedCard === 'projects' ? 'primary' : ''} textColor={selectedCard === 'projects' ? 'white' : 'black'}>
          <CCardBody>
            <div className='h4 text-center'>Proyectos</div>
            <div className='h1 text-center'>{dataAPIProjects ? dataAPIProjects.total : "..."}</div>
          </CCardBody>
        </CCard>
        <CCard className='mx-2 rounded'>
          <CCardBody>
            <div className='h4 text-center'>Total de financiamientos</div>
            <div className='h1 text-center'>{dataTotalFunding ? dataTotalFunding : "..."}</div>
          </CCardBody>
        </CCard>
        <CCard className='mx-2 rounded'>
          <CCardBody>
            <div className='h4 text-center'>H-Index</div>
            <div className='h1 text-center'>1{/*CON API*/}</div>
          </CCardBody>
        </CCard>
      </CCardGroup>
      {
        (selectedCard === 'publications') && dataAPIPublications ?
        (
          <>
            <div className='h5'>Resultados ({dataAPIPublications.total}):</div>
            <InfoSP 
              data={dataAPIPublications.result} 
              headers={HeadersSPEval}
              btnnav={"publicaciones/detalle"} 
              btnmore={"publicaciones"}
              detail={true}
            />
          </>
        )
        :
        (
          (selectedCard === 'projects') && dataAPIProjects ?
          (
            <>
              <div className='h5'>Resultados ({dataAPIProjects.total}):</div>

              <InfoSP 
                data={dataAPIProjects.result} 
                headers={HeadersProjectEval}
                btnnav={"proyectos/detalle"} 
                btnmore={"proyectos"}
                detail={true}
              />
            </>
          )
          :
          (
            (selectedCard === 'groups') && dataAPIGroups ?
            (
              <>
                <div className='h5'>Resultados ({dataAPIGroups.total}):</div>

                <InfoSP 
                  data={dataAPIGroups.result} 
                  headers={HeadersGroupsEval}
                  btnnav={"grupos/detalle"} 
                  btnmore={""}
                  detail={true}
                />
              </>
            )
            :
            (
              <LoadingSpinner />
            )
          )
        )
      }      
    </>
  )
}

export default PerformanceEval