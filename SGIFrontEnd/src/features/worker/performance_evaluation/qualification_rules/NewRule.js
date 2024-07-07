import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardSubtitle, CCol, CForm, CFormInput, CFormSelect, CRow } from '@coreui/react'
import { SPTypes, dataQualificationCategories } from '../../../../data_files/HardData';
import MandatoryRuleCriteria from '../../../../components/selectors/MandatoryRuleCriteria';
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons';
import RuleFactor from '../../../../components/selectors/RuleFactor';
import axiosInstance from '../../../../config/HTTPService'
import { KEYCODE } from '../../../../config/Constants';
import { useNavigate } from 'react-router-dom';

const NewRule = () => {
  const navigate = useNavigate();

  const [ruleName, setRuleName] = useState('');
  const [selectedOptionCategory, setSelectedOptionCategory] = useState('');
  const [selectedOptionSubcategory, setSelectedOptionSubcategory] = useState('');
  const [selectedOptionSPType, setSelectedOptionSPType] = useState('');
  
  const [ruleCriteriaAttribute, setRuleCriteriaAttribute] = useState([]);
  const [ruleCriteriaRange, setRuleCriteriaRange] = useState([]);

  const [ruleCriteria, setRuleCriteria] = useState([]);
  const [ruleFactor, setRuleFactor] = useState([]);

  const handleRuleData = async(e) => {
    const params = {
      keyCode: KEYCODE,
      idSubcategory: selectedOptionSubcategory,
      ruleName: ruleName,
      scientificType: selectedOptionSPType,
      //factAttributeList: ruleCriteriaAttribute,
      //factRangeList: ruleCriteriaRange,
      factGeneralList: ruleCriteria,
      multFactorList: ruleFactor
    };

    console.log(params)

    try {
      
      const response = await axiosInstance.post('api/evaluationrules/newrule', params);
      
      if (response.data) {
        console.log(response.data)
        navigate('/desempeño/reglas')
      } else {
        console.log(response.data.message || 'No se pudo registrar correctamente la nueva regla');
      }
      
    } catch (error) {
      console.error('Error:', error);
    }

  };

  const handleCancelUpdate = () => {
    navigate('/desempeño/reglas')
};

  // HANDLE CHANGES IN CRITERIA //

  const handleMandatoryCriteriaChange = (index, newCriteria) => {
    if(newCriteria.type === "textual"){
      setRuleCriteriaAttribute((prevCriteria) => [...prevCriteria, newCriteria]);
    }
    else{
      setRuleCriteriaRange((prevCriteria) => [...prevCriteria, newCriteria]);
    }

    const newCriteriaGeneral = [...ruleCriteria]
    newCriteriaGeneral[0] = newCriteria
    setRuleCriteria(newCriteriaGeneral)

    //setRuleCriteria((prevCriteria) => [...prevCriteria, newCriteria]);
  }

  const handleNewCriteria = () => {
    setRuleCriteria([...ruleCriteria, {}])
  }

  const handleCriteriaChange = (index, newCriteria) => {
    if(newCriteria.type === "textual"){
      setRuleCriteriaAttribute((prevCriteria) => [...prevCriteria, newCriteria]);
    }
    else{
      setRuleCriteriaRange((prevCriteria) => [...prevCriteria, newCriteria]);
    }
    
    const newCriteriaGeneral = [...ruleCriteria]
    newCriteriaGeneral[index] = newCriteria
    setRuleCriteria(newCriteriaGeneral)
  }

  const handleDeleteCriteria = (index) => {
    // Funciona para eliminar de los arreglos
    let value = ruleCriteria.find((_, i) => i == index)
    console.log(value)

    //console.log(ruleCriteriaAttribute.find((v) => v == value))
    if(ruleCriteriaAttribute.find((v) => v == value)){
      setRuleCriteriaAttribute((prevRuleCriteriaAttribute) => prevRuleCriteriaAttribute.filter((v) => v !== value))
    }

    //console.log(ruleCriteriaRange.find((v) => v == value))
    if(ruleCriteriaRange.find((v) => v == value)){
      setRuleCriteriaRange((prevRuleCriteriaRange) => prevRuleCriteriaRange.filter((v) => v !== value))
    }

    setRuleCriteria((prevCriteriaRules) => prevCriteriaRules.filter((_, i) => i !== index))
  }
  // HANDLE CHANGES IN CRITERIA //

  // HANDLE CHANGES IN FACTOR //

  const handleFirstFactorChange = (index, newFactor) => {
    const newFactorGeneral = [...ruleFactor]
    newFactorGeneral[0] = newFactor
    setRuleFactor(newFactorGeneral)

    //setRuleFactor((prevFactor) => [...prevFactor, newFactor]);
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

  // HANDLE CHANGES IN FACTOR //

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
                  <option value="">Seleccione una subcategoría</option>
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

          <MandatoryRuleCriteria 
            selectedSPTYpe={selectedOptionSPType} 
            onCriteriaChange={handleMandatoryCriteriaChange}
          />

          {ruleCriteria.slice(1).map((_, index) => (
            <MandatoryRuleCriteria
              mandatory={false}
              key={index + 1}
              index={index + 1}
              onCriteriaChange={handleCriteriaChange}
              onDelete={handleDeleteCriteria}
              selectedSPTYpe={selectedOptionSPType} 
            />
          ))}

          <CCol className="d-grid gap-2 d-md-flex justify-content-md-center mt-3 mb-4">
            <CButton color="primary" variant="outline" onClick={handleNewCriteria}>
              <CIcon icon={cilPlus} /> Agregar criterio
            </CButton>
          </CCol>

          {/* FACTOR */}
          <CCardSubtitle className="mb-3 text-body-secondary">Factor de multiplicación (Opcional)</CCardSubtitle>
          <RuleFactor 
            selectedSPTYpe={selectedOptionSPType}
            onCriteriaChange={handleFirstFactorChange} 
          />

          {ruleFactor.slice(1).map((_, index) => (
            <RuleFactor
              first={false}
              key={index + 1}
              index={index + 1}
              onCriteriaChange={handleFactorChange}
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
        <CButton color="primary" variant="outline" className="me-md-2" onClick={handleCancelUpdate}>Cancelar</CButton>
        <CButton color="primary" onClick={handleRuleData}>Guardar</CButton>
      </div>
    </>
  )
}

export default NewRule