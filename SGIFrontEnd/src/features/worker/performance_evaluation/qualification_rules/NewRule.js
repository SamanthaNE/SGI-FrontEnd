import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardSubtitle, CCol, CForm, CFormInput, CFormSelect, CRow } from '@coreui/react'
import { SPTypes, dataQualificationCategories } from '../../../../data_files/HardData';
import CriteriaRuleSelector from '../../../../components/selectors/CriteriaRuleSelector';
import MandatoryRuleCriteria from '../../../../components/selectors/MandatoryRuleCriteria';
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons';
import RuleFactor from '../../../../components/selectors/RuleFactor';
import RuleFactorSelector from '../../../../components/selectors/RuleFactorSelector';

const NewRule = () => {
  const [ruleName, setRuleName] = useState('');
  const [selectedOptionCategory, setSelectedOptionCategory] = useState('');
  const [selectedOptionSubcategory, setSelectedOptionSubcategory] = useState('');
  const [selectedOptionSPType, setSelectedOptionSPType] = useState('');
  
  const [ruleData, setRuleData] = useState([]);
  const [ruleCriteria, setRuleCriteria] = useState([]);
  const [ruleFactor, setRuleFactor] = useState([]);

  const handleRuleData = () => {
    console.log(ruleName);
    console.log(selectedOptionCategory);

    const results = [];
    setRuleData(results);
  };

  const handleNewCriteria = () => {
    setRuleCriteria([...ruleCriteria, {}])
  }

  const handleCriteriaChange = (index, value) => {
    const newCriteria = [...ruleCriteria]
    newCriteria[index] = value
    setRuleCriteria(newCriteria)
  }

  const handleDeleteCriteria = (index) => {
    console.log(index)
    setRuleCriteria((prevCriteriaRules) => prevCriteriaRules.filter((_, i) => i !== index))
  }

  const handleNewFactor = () => {
    setRuleFactor([...ruleFactor, {}])
  }

  const handleFactorChange = (index, value) => {
    const newFactor = [...ruleFactor]
    newFactor[index] = value
    setRuleFactor(newFactor)
  }

  const handleDeleteFactor = (index) => {
    console.log(index)
    setRuleFactor((prevRulesFactor) => prevRulesFactor.filter((_, i) => i !== index))
  }

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
                  <option key={option.id} value={option.type} disabled={indexSPT > 1 ? true : false}>
                    {option.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          <MandatoryRuleCriteria selectedSPTYpe={selectedOptionSPType} />

          {ruleCriteria.map((_, index) => (
            <CriteriaRuleSelector
              key={index}
              index={index}
              handleChange={handleCriteriaChange}
              onDelete={handleDeleteCriteria}
              selectedSPTYpe={selectedOptionSPType} 
            />
          ))}

          <CCol className="d-grid gap-2 d-md-flex justify-content-md-center mt-3 mb-4">
            <CButton color="primary" variant="outline" onClick={handleNewCriteria}>
              <CIcon icon={cilPlus} /> Agregar criterio
            </CButton>
          </CCol>

          <RuleFactor selectedSPTYpe={selectedOptionSPType} />

          {ruleFactor.map((_, index) => (
            <RuleFactorSelector
              key={index}
              index={index}
              handleChange={handleFactorChange}
              onDelete={handleDeleteFactor}
              selectedSPTYpe={selectedOptionSPType} 
            />
          ))}

          <CCol className="d-grid gap-2 d-md-flex justify-content-md-center mt-3 mb-4">
            <CButton color="primary" variant="outline" onClick={handleNewFactor}>
              <CIcon icon={cilPlus} /> Agregar factor
            </CButton>
          </CCol>

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