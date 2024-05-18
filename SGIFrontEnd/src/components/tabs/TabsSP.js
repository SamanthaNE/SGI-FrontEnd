import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import InfoSP from '../cards/InfoSP'
import { useNavigate } from 'react-router-dom'
import HeadersFunding from '../../data_files/HeadersFunding'
import { HeadersProject } from '../../data_files/HeadersProject'

{/* API - ID DEL AUTHOR PARA LLAMAR A TODOS SUS PROYECTOS, PATENTES, PRODUCTOS */}
{/* API - PARA LLAMAR A TODAS LOS FINANCIAMIENTOS */}

const TabsSP = ({SPID, typeTab}) => {
  const [activeKey, setActiveKey] = useState(1)

  const navigate = useNavigate()

  const handleNavigationProject = () => {
    navigate('/publicaciones/revision/detalle/' + `${SPID}` + '/proyectos');
  }

  const handleNavigationFunding = () => {
    navigate('/publicaciones/revision/detalle/' + `${SPID}` + '/proyectos/nuevo/financiamiento');
  }
  
  return (
    <>
      {
        typeTab === "scientific" ?
        (
          <CNav variant="tabs" role="tablist">
            <CNavItem>
              <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
                Proyectos
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)} disabled>
                Productos
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink active={activeKey === 3} onClick={() => setActiveKey(3)} disabled>
                Patentes
              </CNavLink>
            </CNavItem>
          </CNav>
          
        )
        :
        (
          <CNav variant="tabs" role="tablist">
            <CNavItem>
              <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
                Financiamientos
              </CNavLink>
            </CNavItem>
          </CNav>
        )
      }

      <CCard>
        <CCardBody>
          {
            typeTab === "scientific" ?
            (
              <CTabContent>
                <CTabPane role="tabpanel" aria-labelledby="project-tab" visible={activeKey === 1}>
                  <InfoSP data={[]} headers={HeadersProject} detail={false}/>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
                    <CButton color="primary" variant="outline" onClick={handleNavigationProject}>Buscar</CButton>
                  </div>
                </CTabPane>
                <CTabPane role="tabpanel" aria-labelledby="product-tab" visible={activeKey === 2} >
                  No se cuenta con ningún producto vinculado              
                </CTabPane>
                <CTabPane role="tabpanel" aria-labelledby="patent-tab" visible={activeKey === 3}>
                  No se cuenta con ninguna patente vinculada
                </CTabPane>
              </CTabContent>
            )
            :
            (
              <CTabContent>
                <CTabPane role="tabpanel" aria-labelledby="project-tab" visible={activeKey === 1}>
                  <InfoSP data={[]} headers={HeadersFunding} detail={false}/>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
                    <CButton color="primary" variant="outline" onClick={handleNavigationFunding}>Buscar</CButton>
                  </div>
                </CTabPane>
              </CTabContent>
            )
          }
          
        </CCardBody>
      </CCard>
      
    </>
  )
}

export default TabsSP