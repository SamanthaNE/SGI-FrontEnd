import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardSubtitle, CCol, CForm, CFormInput, CFormSelect, CRow } from '@coreui/react'
import { SPTypes, dataQualificationCategories } from '../../../../data_files/HardData';
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons';
import RuleFactor from '../../../../components/selectors/RuleFactor';
import axiosInstance from '../../../../config/HTTPService'
import { KEYCODE } from '../../../../config/Constants';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../../../components/spinner/LoadingSpinner';
import ErrorNotification from '../../../../components/cards/ErrorNotification';
import CriteriaSelectorRuleDetail from '../../../../components/selectors/CriteriaSelectorRuleDetail';
import FactorSelectorRuleDetail from '../../../../components/selectors/FactorSelectorRuleDetail';
import MandatoryRuleCriteria from '../../../../components/selectors/MandatoryRuleCriteria';

const RuleDetail = () => {
  const { elementID } = useParams()
  const navigate = useNavigate();

  const [dataAPIRule, setDataAPIRule] = useState(null);
  const [error, setError] = useState(false)

  const [ruleName, setRuleName] = useState('');
  const [selectedOptionCategory, setSelectedOptionCategory] = useState('');
  const [selectedOptionSubcategory, setSelectedOptionSubcategory] = useState('');
  const [selectedOptionSPType, setSelectedOptionSPType] = useState('');
  
  const [ruleCriteria, setRuleCriteria] = useState([]);
  const [ruleFactor, setRuleFactor] = useState([]);

  const [newCriteriaVisible, setNewCriteriaVisible] = useState(false)
  const [newRuleCriteria, setNewRuleCriteria] = useState([]);

  const [newFactorVisible, setNewFactorVisible] = useState(false)
  const [newRuleFactor, setNewRuleFactor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        'keyCode': KEYCODE,
        'ruleId': elementID
      };

      await axiosInstance.get('api/evaluationrules/detailrule', { params })
                        .then((response) => {
                          setRuleName(response.data.ruleDetail.rule.ruleName)
                          setSelectedOptionCategory(response.data.ruleDetail.idCategory)
                          setSelectedOptionSubcategory(response.data.ruleDetail.rule.idSubcategory)
                          setSelectedOptionSPType(response.data.ruleDetail.rule.scientificType)

                          setRuleCriteria(response.data.ruleDetail.factAttributeListRule.concat(response.data.ruleDetail.factRangeListRule))
                          setRuleFactor(response.data.ruleDetail.factAttributeListFactor.concat(response.data.ruleDetail.factRangeListFactor))

                          setDataAPIRule(response.data.ruleDetail);
                          console.log(response.data.ruleDetail)
                        })
                        .catch((err) => {
                          let errMsg;
                          (!err.response) ? errMsg = 'No se pudo conectar con el servidor. Verifique su conexión.' 
                            : (err.response.code === 404 ? errMsg = "Servicio no disponible. Intenta más tarde." 
                              : errMsg = err.response.data.message);
                          setError(true)
                          //setDataAPIRule({result:[]})
                        });
    }
  
    fetchData();
  }, [])

  const handleUpdateRuleData = async(e) => {
    const params = {
      keyCode: KEYCODE,
      idRule: elementID,
      idSubcategory: selectedOptionSubcategory,
      ruleName: ruleName,
      scientificType: selectedOptionSPType,
      factGeneralListToUpdate: ruleCriteria,
      multFactorListToUpdate: ruleFactor,
      factGeneralList: newRuleCriteria,
      multFactorList: newRuleFactor
    };

    console.log(params)

    try {
      
      const response = await axiosInstance.post('api/evaluationrules/updaterule', params);
      
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

  const handleNewCriteria = () => {
    setNewCriteriaVisible(true)
    setNewRuleCriteria([...newRuleCriteria, {}])
  }

  const handleCriteriaUpdate = (index, newCriteria) => {   
    const updateRule = ruleCriteria.find(rule => (rule.idFA !== undefined ? rule.idFA : rule.idFR) === index)
    updateRule.score = newCriteria.score
    updateRule.connector = newCriteria.connector
  }

  const handleNewCriteriaChange = (index, newCriteria) => {   
    const newCriteriaGeneral = [...newRuleCriteria]
    newCriteriaGeneral[index] = newCriteria
    setNewRuleCriteria(newCriteriaGeneral)
  }

  const handleDeleteCriteria = (index) => {
    setRuleCriteria((prevCriteriaRules) => prevCriteriaRules.filter((_, i) => i !== index))
  }
  // HANDLE CHANGES IN CRITERIA //

  // HANDLE CHANGES IN FACTOR //

  const handleNewFactor = () => {
    setNewFactorVisible(true)
    setNewRuleFactor([...newRuleFactor, {}])
  }

  const handleFactorUpdate = (index, value) => {
    const updateFactor = ruleFactor.find(rule => (rule.idFA !== undefined ? rule.idFA : rule.idFR) === index)
    updateFactor.score = value.score
    updateFactor.connector = value.connector
  }

  const handleNewFactorChange = (index, value) => {
    const newFactor = [...newRuleFactor]
    newFactor[index] = value
    setNewRuleFactor(newFactor)
  }

  const handleDeleteFactor = (index) => {
    setRuleFactor((prevRulesFactor) => prevRulesFactor.filter((_, i) => i !== index))
  }

  // HANDLE CHANGES IN FACTOR //

  return (
    <>
    {
      dataAPIRule ?
      (<>
        {/* PUBLICATION DATA */}
        <div className='h4 mb-3'>Detalle de una regla de calificación</div>

        {/* AUTHOR */}
        <CCard className='mb-3'>
          <CCardBody>
            <CCardSubtitle className="mb-3 text-body-secondary">Datos generales</CCardSubtitle>
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
                  {dataQualificationCategories.map((option, _) => (
                    <option key={option.id} value={option.id}>
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
                      dataQualificationCategories.find(category => category.id === selectedOptionCategory)?.subcategories.map((option) => (
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
                <CFormSelect aria-label="type" disabled={true}
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

            {
              ruleCriteria.map((option, index) => (
                <CriteriaSelectorRuleDetail
                  mandatory={index === 0 ? true : false}
                  key={index}
                  optionID={option.idFA !== undefined ?  option.idFA : option.idFR}
                  index={index}
                  onCriteriaChange={handleCriteriaUpdate}
                  onDelete={handleDeleteCriteria}
                  selectedSPTYpe={selectedOptionSPType}
                  data={option}
                />
              ))
            }

            {
              newCriteriaVisible &&
              newRuleCriteria.map((_, indexNRC) => (
                <MandatoryRuleCriteria
                  mandatory={false}
                  key={indexNRC}
                  index={indexNRC}
                  onCriteriaChange={handleNewCriteriaChange}
                  onDelete={handleDeleteCriteria}
                  selectedSPTYpe={selectedOptionSPType} 
                />
              ))
            }

            <CCol className="d-grid gap-2 d-md-flex justify-content-md-center mt-3 mb-4">
              <CButton color="primary" variant="outline" onClick={handleNewCriteria}>
                <CIcon icon={cilPlus} /> Agregar criterio
              </CButton>
            </CCol>

            {/* FACTOR */}
            <CCardSubtitle className="mb-3 text-body-secondary">Factor de multiplicación (Opcional)</CCardSubtitle>

            {
              ruleFactor.map((option, index) => (
                <FactorSelectorRuleDetail
                  first={index === 0 ? true : false}
                  key={index}
                  optionID={option.idFA !== undefined ?  option.idFA : option.idFR}
                  index={index}
                  onCriteriaChange={handleFactorUpdate}
                  onDelete={handleDeleteFactor}
                  selectedSPTYpe={selectedOptionSPType}
                  data={option}
                />
              ))
            }

            {
              newFactorVisible &&
              newRuleFactor.map((_, indexNRF) => (
                <RuleFactor
                  first={false}
                  key={indexNRF}
                  index={indexNRF}
                  onCriteriaChange={handleNewFactorChange}
                  onDelete={handleDeleteFactor}
                  selectedSPTYpe={selectedOptionSPType} 
                />
              ))
            }

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
          <CButton color="primary" onClick={handleUpdateRuleData}>Guardar</CButton>
        </div>
      </>)
      :
      (
        error ?
        (<ErrorNotification/>)
        :
        (<LoadingSpinner />)
      )
    }
    </>
  )
}

export default RuleDetail