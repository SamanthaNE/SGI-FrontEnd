import { CCard, CCardBody, CCardGroup, CCardText, CCardTitle } from '@coreui/react'
import React from 'react'

const PerformanceEval = () => {
  return (
    <>
        <div className='h4'>Evaluación de desempeño</div>

        <CCardGroup>
          <CCard className='mx-2 rounded'>
            <CCardBody>
            <div className='h4 text-center'>Publicaciones</div>
              <CCardText>
                50
              </CCardText>
            </CCardBody>
          </CCard>
          <CCard className='mx-2 rounded'>
            <CCardBody>
            <div className='h4 text-center'>Grupos de investigación</div>
              <CCardText>
                5
              </CCardText>
            </CCardBody>
          </CCard>
          <CCard className='mx-2 rounded'>
            <CCardBody>
            <div className='h4 text-center'>Proyectos</div>
              <CCardText>
                3
              </CCardText>
            </CCardBody>
          </CCard>
          <CCard className='mx-2 rounded'>
            <CCardBody>
            <div className='h4 text-center'>Total de financiamiento</div>
              <CCardText>
                2
              </CCardText>
            </CCardBody>
          </CCard>
          <CCard className='mx-2 rounded'>
            <CCardBody>
            <div className='h4 text-center'>H-Index</div>
              <CCardText>
                1
              </CCardText>
            </CCardBody>
          </CCard>
        </CCardGroup>
    </>
  )
}

export default PerformanceEval