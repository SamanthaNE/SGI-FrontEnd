import React from 'react'
import { CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody } from '@coreui/react'
import InfoSP from '../cards/InfoSP';
import { HeadersFundingWorker, HeadersProjectsWorker, HeadersPublicationsWorker } from '../../data_files/HeadersWorker';

const AccordionInfo = ({title, data, userRole}) => {
  return (
    <CAccordion className="mb-3">
      <CAccordionItem>
        <CAccordionHeader>{title} {title === ('Publicaciones' || 'Patentes') ? ("vinculadas") : ("vinculados")}</CAccordionHeader>
        <CAccordionBody>
          {
            userRole === "researcher" ?
            (
              <InfoSP 
                data={data} 
                headers={title  === 'Publicaciones' ? (HeadersPublicationsWorker) : (title  === 'Proyectos' ? (HeadersProjectsWorker) : (HeadersFundingWorker))}
                btnnav={title  === 'Publicaciones' ? ("/evaluacion/publicaciones/detalle") : (title  === 'Proyectos' ? ("/evaluacion/proyectos/detalle") : (""))} 
                btnmore={"empty"}
                detail={true}
              />
            )
            :
            (
              <InfoSP 
                data={data} 
                headers={title  === 'Publicaciones' ? (HeadersPublicationsWorker) : (title  === 'Proyectos' ? (HeadersProjectsWorker) : (HeadersFundingWorker))}
                btnnav={title  === 'Publicaciones' ? ("/publicaciones/historico/detalle") : (title  === 'Proyectos' ? ("/proyectos/detalle") : (""))} 
                btnmore={"empty"}
                detail={true}
              />
            )
          }

        </CAccordionBody>
      </CAccordionItem>
    </CAccordion>
  );
}

export default AccordionInfo