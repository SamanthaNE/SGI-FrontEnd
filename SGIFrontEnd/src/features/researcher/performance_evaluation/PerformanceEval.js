import { CCard, CCardBody, CCardGroup } from '@coreui/react'
import React, { useState } from 'react'
import InfoSP from '../../../components/cards/InfoSP';
import { HeadersGroupsEval, HeadersSPEval } from '../../../data_files/HeadersSP';
import { HeadersProjectEval } from '../../../data_files/HeadersProject';
import { dataGroups, dataProjectSearch, dataPublications, dataScopusPublication } from '../../../data_files/HardData';

const PerformanceEval = () => {
  const [selectedCard, setSelectedCard] = useState('publications');

  const handleCardClick = (cardType) => {
    setSelectedCard(cardType);
  };

  return (
    <>
      <div className='h4'>Evaluación de desempeño</div>
      <CCardGroup className='mt-3 mb-5'>
        <CCard className='mx-2 rounded' onClick={() => handleCardClick('publications')} color={selectedCard === 'publications' ? 'primary' : ''} textColor={selectedCard === 'publications' ? 'white' : 'black'}>
          <CCardBody>
            <div className='h4 text-center'>Publicaciones</div>
            <div className='h1 text-center'>50{/*CON API*/}</div>
          </CCardBody>
        </CCard>
        <CCard className='mx-2 rounded' onClick={() => handleCardClick('groups')} color={selectedCard === 'groups' ? 'primary' : ''} textColor={selectedCard === 'groups' ? 'white' : 'black'}>
          <CCardBody>
            <div className='h4 text-center'>Grupos de investigación</div>
            <div className='h1 text-center'>5{/*CON API*/}</div>
          </CCardBody>
        </CCard>
        <CCard className='mx-2 rounded' onClick={() => handleCardClick('projects')} color={selectedCard === 'projects' ? 'primary' : ''} textColor={selectedCard === 'projects' ? 'white' : 'black'}>
          <CCardBody>
            <div className='h4 text-center'>Proyectos</div>
            <div className='h1 text-center'>3{/*CON API*/}</div>
          </CCardBody>
        </CCard>
        <CCard className='mx-2 rounded'>
          <CCardBody>
            <div className='h4 text-center'>Total de financiamiento</div>
            <div className='h1 text-center'>2{/*CON API*/}</div>
          </CCardBody>
        </CCard>
        <CCard className='mx-2 rounded'>
          <CCardBody>
            <div className='h4 text-center'>H-Index</div>
            <div className='h1 text-center'>1{/*CON API*/}</div>
          </CCardBody>
        </CCard>
      </CCardGroup>

      {/* HEADER */}
      <div className='h5'>Resultados ({selectedCard === 'publications' ? (dataPublications.length) : (selectedCard === 'projects' ? (dataProjectSearch.length) : (dataGroups.length))}):</div>

      <InfoSP 
        data={selectedCard === 'publications' ? (dataPublications) : (selectedCard === 'projects' ? (dataProjectSearch) : (dataGroups))} 
        headers={selectedCard === 'publications' ? (HeadersSPEval) : (selectedCard === 'projects' ? (HeadersProjectEval) : (HeadersGroupsEval))}
        btnnav={selectedCard === 'publications' ? ("publicaciones/detalle") : (selectedCard === 'projects' ? ("proyectos/detalle") : ( "grupos/detalle"))} 
        btnmore={selectedCard === 'publications' ? ("publicaciones") : (selectedCard === 'projects' ? ("proyectos") : (""))}
        detail={true}
      />
    </>
  )
}

export default PerformanceEval