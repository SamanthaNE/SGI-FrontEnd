import React, { useState } from 'react'
import { CCol, CFormCheck, CFormSelect, CRow } from '@coreui/react'
import { SPRuleCondition, SPTypes } from '../../data_files/HardData';

const CriteriaRuleSelector = () => {
  const [selectedOptionSPTypeAttribute, setSelectedOptionSPTypeAttribute] = useState('');
  const [selectedOptionSPTypeCondition, setSelectedOptionSPTypeCondition] = useState('');
  const [selectedOptionSPTypeValue, setSelectedOptionSPTypeValue] = useState('');
  const [activeStatus, setActiveStatus] = useState(null)

  function handleStatus(e) {
    setActiveStatus(e.target.value);
  }

  return (
    <>
      <CRow className="d-flex align-items-center mb-3">
        <CCol sm={1}>
          <CFormCheck button={{ color: 'primary', variant: 'outline' }} type="radio" name="options-outlined-status" id={'Y'} 
                      label={'Y'} value={"AND"} onChange={handleStatus} checked={activeStatus === "AND"}/>
          <CFormCheck button={{ color: 'primary', variant: 'outline' }} type="radio" name="options-outlined-status" id={'O'} 
                      label={'O'} value={"OR"} onChange={handleStatus} checked={activeStatus === "OR"}/>
        </CCol>
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

export default CriteriaRuleSelector