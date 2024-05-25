import React, { useState } from 'react'
import { CButton, CCol, CFormCheck, CFormInput, CFormSelect, CRow } from '@coreui/react'
import { SPAttributes, SPRuleConditionNumeric, SPRuleConditionTextual } from '../../data_files/HardData';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';

const CriteriaRuleSelector = ({ index, handleChange, onDelete, selectedSPTYpe }) => {
  const [selectedOptionSPTypeAttribute, setSelectedOptionSPTypeAttribute] = useState('');
  const [selectedOptionSPTypeCondition, setSelectedOptionSPTypeCondition] = useState('');
  const [selectedOptionSPTypeValue, setSelectedOptionSPTypeValue] = useState('');
  const [score, setScore] = useState('');

  const [isInputVisible, setIsInputVisible] = useState(false)
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');

  const [activeStatus, setActiveStatus] = useState(null)

  function handleStatus(e) {
    setActiveStatus(e.target.value);
  }

  const handleConditionChange = (e) => {
    const value = e.target.value
    setSelectedOptionSPTypeCondition(value)

    if (value === '5') {
      setIsInputVisible(true)
    } else {
      setIsInputVisible(false)
    }
  }

  const filteredAttributes = SPAttributes.filter(attr => attr.sptype === selectedSPTYpe);

  return (
    <>
      <CRow className="d-flex align-items-center mb-3">
        <CCol sm={1}>
          <CFormCheck button={{ color: 'primary', variant: 'outline' }} type="radio" name={`options-outlined-status-${index}`}  
                      id={`RY-${index}`} label={'Y'} value={"AND"} onChange={handleStatus} checked={activeStatus === "AND"}/>
          <CFormCheck button={{ color: 'primary', variant: 'outline' }} type="radio" name={`options-outlined-status-${index}`}
                       id={`RO-${index}`}  label={'O'} value={"OR"} onChange={handleStatus} checked={activeStatus === "OR"}/>
        </CCol>
        <CCol>
          <CFormSelect aria-label="type"
                        value={selectedOptionSPTypeAttribute} onChange={(e) => setSelectedOptionSPTypeAttribute(e.target.value)}>
            <option value="">Atributo</option>
            {filteredAttributes.map((option, indexSPA) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol>
          <CFormSelect aria-label="condition"
                        value={selectedOptionSPTypeCondition} onChange={handleConditionChange}>
            <option value="">Condición</option>
            {selectedOptionSPTypeAttribute &&
            (
              SPAttributes[selectedOptionSPTypeAttribute - 1].type === 'textual' ?
              (
                SPRuleConditionTextual.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.type}
                  </option>
                ))
              )
              :
              (
                SPRuleConditionNumeric.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.type}
                  </option>
                ))
              )
            )
            }
          </CFormSelect>
        </CCol>
        <CCol>
        {selectedOptionSPTypeAttribute &&
          SPAttributes[selectedOptionSPTypeAttribute - 1].type === 'textual' ? 
          (
            <CFormSelect aria-label="criteria-value"
                        value={selectedOptionSPTypeValue} onChange={(e) => setSelectedOptionSPTypeValue(e.target.value)}>
              <option value="">Valor</option>
              {
                SPAttributes[selectedOptionSPTypeAttribute - 1].attributeValue.map((option, indexSPT) => (
                  <option key={option.id} value={option.id}>
                    {option.value}
                  </option>
                ))
              }
            </CFormSelect>
          )
          :
          (
            isInputVisible ?
            (
              <>
                <CFormInput
                  aria-label="criteria-value"
                  placeholder="Mínimo valor"
                  value={minValue}
                  onChange={(e) => setMinValue(e.target.value)}
                />
                <CFormInput
                  aria-label="criteria-value"
                  placeholder="Máximo valor"
                  value={maxValue}
                  onChange={(e) => setMaxValue(e.target.value)}
                />
              </>
            )
            :
            (
              <CFormInput
                aria-label="criteria-value"
                placeholder="Valor"
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
              />
            )
          )
        }
        </CCol>

        <CCol>
          <CFormInput type="input" id="score" placeholder="Puntaje asignado" 
                      value={score} onChange={(e) => setScore(e.target.value.replace(/[^0-9]/g, ''))}
          />
        </CCol>

        <CCol sm={1} className="d-flex justify-content-center">
          <CButton color="danger" variant="outline" onClick={() => onDelete(index)}>
            <CIcon icon={cilTrash} />
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default CriteriaRuleSelector