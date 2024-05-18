import React from 'react'
import { CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody, CCol } from '@coreui/react'
import {  HeadersQualificationRules } from '../../data_files/HeadersWorker';
import InfoQualificationRule from '../cards/InfoQualificationRule';

const AccordionRules = ({title, subcategory}) => {
  return (
    <CAccordion className="mb-3">
      <CAccordionItem>
        <CAccordionHeader>{title}</CAccordionHeader>
        <CAccordionBody>
          {subcategory.map((subcategoryItem, indexC) => {
            return (
              <CCol key={indexC} className='mb-3'>
                <div >{indexC + 1}. {subcategoryItem.subcategory}</div>
                <InfoQualificationRule 
                  dataRules={subcategoryItem.subrules}
                  headers={HeadersQualificationRules}
                  btnnav={"detalle"}
                />
              </CCol>
            )
          })}
          
        </CAccordionBody>
      </CAccordionItem>
    </CAccordion>
  )
}

export default AccordionRules