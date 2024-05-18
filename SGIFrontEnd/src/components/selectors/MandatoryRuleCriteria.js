import React, { useState } from 'react'
import { CCol, CFormSelect, CRow } from '@coreui/react'
import { SPRuleCondition, SPTypes } from '../../data_files/HardData';

const MandatoryRuleCriteria = () => {
  const [selectedOptionSPTypeAttribute, setSelectedOptionSPTypeAttribute] = useState('');
  const [selectedOptionSPTypeCondition, setSelectedOptionSPTypeCondition] = useState('');
  const [selectedOptionSPTypeValue, setSelectedOptionSPTypeValue] = useState('');

  return (
    <>
      <CRow className="d-flex align-items-center mb-3">
        <CCol sm={1}>Y</CCol>
        <CCol>
          <CFormSelect aria-label="type"
                        value={selectedOptionSPTypeAttribute} onChange={(e) => setSelectedOptionSPTypeAttribute(e.target.value)}>
            <option value="">Atributo</option>
            {SPTypes.map((option, indexSPT) => (
              <option key={option.id} value={option.id} disabled={indexSPT > 1 ? true : false}>
                {option.type}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol>
          <CFormSelect aria-label="condition"
                        value={selectedOptionSPTypeCondition} onChange={(e) => setSelectedOptionSPTypeCondition(e.target.value)}>
            <option value="">Condición</option>
            {SPRuleCondition.map((option) => (
              <option key={option.id} value={option.id}>
                {option.type}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol>
          <CFormSelect aria-label="criteria-value"
                        value={selectedOptionSPTypeValue} onChange={(e) => setSelectedOptionSPTypeValue(e.target.value)}>
            <option value="">Valor</option>
            {SPTypes.map((option, indexSPT) => (
              <option key={option.id} value={option.id} disabled={indexSPT > 1 ? true : false}>
                {option.type}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}

export default MandatoryRuleCriteria