import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardSubtitle, CCol, CForm, CFormInput, CFormSelect, CRow } from '@coreui/react'
import { SPRuleCondition, SPTypes, dataQualificationCategories } from '../../../../data_files/HardData';
import CriteriaRuleSelector from '../../../../components/selectors/CriteriaRuleSelector';
import MandatoryRuleCriteria from '../../../../components/selectors/MandatoryRuleCriteria';
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons';

const NewRule = () => {
  const [ruleName, setRuleName] = useState('');
  const [selectedOptionCategory, setSelectedOptionCategory] = useState('');
  const [selectedOptionSubcategory, setSelectedOptionSubcategory] = useState('');
  const [selectedOptionSPType, setSelectedOptionSPType] = useState('');
  const [selectedOptionSPTypeAttribute, setSelectedOptionSPTypeAttribute] = useState('');
  const [selectedOptionSPTypeCondition, setSelectedOptionSPTypeCondition] = useState('');
  const [selectedOptionSPTypeValue, setSelectedOptionSPTypeValue] = useState('');

  const [ruleData, setRuleData] = useState([]);

  const handleRuleData = () => {
    console.log(ruleName);
    console.log(selectedOptionCategory);

    const results = [];
    setRuleData(results);
  };

  return (
    <>
      {/* PUBLICATION DATA */}
      <div className='h4 mb-3'>Registro de nueva regla de calificación</div>

      {/* AUTHOR */}
      <CCard className='mb-3'>
        <CCardBody>
          <CCardSubtitle className="mb-3 text-body-secondary">Complete la siguiente informacion</CCardSubtitle>
          <CForm>
            <CFormInput className='mb-3' type="input" id="name" label="Nombre de la regla" placeholder="Nombre" 
                        value={ruleName} onChange={(e) => setRuleName(e.target.value)}
            />
          </CForm>

          {/* CATEGORY AND SUBCATEGORY */}
          <CCardSubtitle className="mb-3 text-body-secondary">Categoria y Subcategoría a la que pertenece la regla</CCardSubtitle>
          <CRow className="align-items-end">
            <CCol className='mb-3' >
              <CFormSelect aria-label="category" label="Categoría" 
                            value={selectedOptionCategory} onChange={(e) => setSelectedOptionCategory(e.target.value)}>
                <option value="">Seleccione una categoría</option>
                {dataQualificationCategories.map((option, indexC) => (
                  <option key={option.id} value={indexC}>
                    {option.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol className='mb-3'>
                <CFormSelect aria-label="subcategory" label="Subcategoría" 
                              value={selectedOptionSubcategory} onChange={(e) => setSelectedOptionSubcategory(e.target.value)}>
                  <option value="">Seleccione una categoría</option>
                  {selectedOptionCategory &&
                    dataQualificationCategories[selectedOptionCategory].subcategories.map((option) => (
                      <option  key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))
                  }
                </CFormSelect>
            </CCol>
          </CRow>

          {/* CRITERIA */}
          <CCardSubtitle className="mb-3 text-body-secondary">Criterios que debe cumplir</CCardSubtitle>
          <CRow className="d-flex align-items-center mb-3">
            <CCol sm={1}>Si es un(a)</CCol>
            <CCol>
              <CFormSelect aria-label="type"
                            value={selectedOptionSPType} onChange={(e) => setSelectedOptionSPType(e.target.value)}>
                <option value="">Tipo de producción científica</option>
                {SPTypes.map((option, indexSPT) => (
                  <option key={option.id} value={option.id} disabled={indexSPT > 1 ? true : false}>
                    {option.type}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

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

          <CCol className="d-grid gap-2 d-md-flex justify-content-md-center mt-3 mb-4">
            <CButton color="primary" variant="outline">
              <CIcon icon={cilPlus} /> Agregar criterio
            </CButton>
          </CCol>

          <CriteriaRuleSelector />
        </CCardBody>
      </CCard>

      {/* FINISH */}       
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3 mb-4">
        <CButton color="primary" variant="outline" className="me-md-2">Cancelar</CButton>
        <CButton color="primary" onClick={handleRuleData}>Guardar</CButton>
      </div>
    </>
  )
}

export default NewRule