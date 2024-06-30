import React, { useEffect, useState } from 'react'
import { CButton, CCol, CFormCheck, CFormInput, CFormSelect, CRow, CTooltip } from '@coreui/react'
import { SPAttributes, SPRuleConditionNumeric, SPRuleConditionTextual } from '../../data_files/HardData';
import CIcon from '@coreui/icons-react';
import { cilAsteriskCircle, cilTrash } from '@coreui/icons';

const MandatoryRuleCriteria = ({ mandatory = true, selectedSPTYpe, onCriteriaChange, index, onDelete }) => {
  const [selectedOptionSPTypeAttribute, setSelectedOptionSPTypeAttribute] = useState('');
  const [selectedOptionSPTypeCondition, setSelectedOptionSPTypeCondition] = useState('');
  const [selectedOptionSPTypeValue, setSelectedOptionSPTypeValue] = useState('');
  const [score, setScore] = useState('');

  const [isInputVisible, setIsInputVisible] = useState(false)
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');

  const [activeStatus, setActiveStatus] = useState(null)

  useEffect(() => {
    if (!selectedOptionSPTypeAttribute || !selectedOptionSPTypeCondition || !score) {
      // Si alguno de los campos obligatorios no está completo, no hacer nada
      return;
    }

    let newCriteria;
    const attributeType = SPAttributes[selectedOptionSPTypeAttribute - 1].type;

    if (attributeType === 'textual' && selectedOptionSPTypeValue) {
      newCriteria = {
        type: attributeType,
        attribute: SPAttributes[selectedOptionSPTypeAttribute - 1].attribute,
        conditionType: selectedOptionSPTypeCondition,
        attributeValue: selectedOptionSPTypeValue,
        score: score,
        connector: activeStatus ?? null
      };

    } else if (attributeType !== 'textual' && (isInputVisible ? minValue && maxValue : minValue)) {
      newCriteria = {
        type: attributeType,
        attribute: SPAttributes[selectedOptionSPTypeAttribute - 1].attribute,
        conditionType: selectedOptionSPTypeCondition,
        minValue: minValue,
        maxValue: maxValue === '' ? 0 : maxValue,
        score: score,
        connector: activeStatus ?? null
      };

    } else {
      // Si los campos necesarios no están completos, no hacer nada
      return;
    }

    onCriteriaChange(index, newCriteria);
  }, [selectedOptionSPTypeAttribute, selectedOptionSPTypeCondition, selectedOptionSPTypeValue, score, minValue, maxValue, isInputVisible, activeStatus]);

  const handleConditionChange = (e) => {
    const value = e.target.value
    setSelectedOptionSPTypeCondition(value)

    if (value === '[]') {
      setIsInputVisible(true)
    } else {
      setIsInputVisible(false)
    }
  }

  const handleScoreChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;

    if (regex.test(value)) {
      setScore(value);
    }
  };

  const handleStatus = (e) => {
    setActiveStatus(e.target.value);
  }

  const filteredAttributes = SPAttributes.filter(attr => attr.sptype === selectedSPTYpe);

  return (
    <>
      <CRow className="d-flex align-items-center mb-3">
        {
          mandatory ?
          (
            <CCol sm={1}>Y</CCol>
          )
          :
          (
            <CCol sm={1}>
              <CFormCheck button={{ color: 'primary', variant: 'outline' }} type="radio" name={`options-outlined-status-R-${index}`}  
                          id={`RY-${index}`} label={'Y'} value={"AND"} onChange={handleStatus} checked={activeStatus === "AND"}/>
              <CFormCheck button={{ color: 'primary', variant: 'outline' }} type="radio" name={`options-outlined-status-R-${index}`}
                          id={`RO-${index}`}  label={'O'} value={"OR"} onChange={handleStatus} checked={activeStatus === "OR"}/>
            </CCol>
          )
        }

        <CCol>
          <CFormSelect aria-label="type"
                        value={selectedOptionSPTypeAttribute} onChange={(e) => setSelectedOptionSPTypeAttribute(e.target.value)}>
            <option value="">Atributo</option>
            {filteredAttributes.map((option, _) => (
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
                  <option key={option.id} value={option.value}>
                    {option.type}
                  </option>
                ))
              )
              :
              (
                SPRuleConditionNumeric.map((option) => (
                  <option key={option.id} value={option.value}>
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
                SPAttributes[selectedOptionSPTypeAttribute - 1].attributeValue.map((option, _) => (
                  <option key={option.id} value={option.value}>
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
                      value={score} onChange={handleScoreChange}
          />
        </CCol>
        {
          mandatory ? 
          (
            <CCol sm={1} className="d-flex justify-content-center">
              <CTooltip content="Criterio obligatorio inicial" placement="right">
                <CIcon icon={cilAsteriskCircle} />
              </CTooltip>
            </CCol>
          )
          :
          (
            <CCol sm={1} className="d-flex justify-content-center">
              <CButton color="danger" variant="outline" onClick={() => onDelete(index)}>
                <CIcon icon={cilTrash} />
              </CButton>
            </CCol>
          )
        }
        
      </CRow>
    </>
  )
}

export default MandatoryRuleCriteria