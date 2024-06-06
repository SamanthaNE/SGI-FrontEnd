import { CButton, CCard, CCardBody, CCardSubtitle, CCol, CForm, CFormInput, CFormSelect, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { Currency, FFOrg, FundedAs, PFFunding } from '../../../data_files/FiltersData';
import { useNavigate } from 'react-router-dom';
import { KEYCODE } from '../../../config/Constants'

const NewFunding = () => {
  const navigate = useNavigate()
  const [fundingName, setFundingName] = useState('');
  const [selectedOptionFunding, setSelectedOptionFunding] = useState('');
  const [selectedOptionCurrency, setSelectedOptionCurrency] = useState('');
  const [fundingAmount, setFundingAmount] = useState('');
  const [selectedOptionOrg, setSelectedOptionOrg] = useState('');
  const [selectedOptionFundedAs, setSelectedOptionFundedAs] = useState('');

  const handleFundingAmountChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;

    if (regex.test(value)) {
      setFundingAmount(value);
    }
  };

  const handleFundingData = () => {
    const params = {
      keyCode: KEYCODE,
      fundedAs: selectedOptionFundedAs,
      categoria: fundingName,
      currCode: selectedOptionCurrency,
      amount: fundingAmount,
      idFundingType: selectedOptionFunding,
      idOrgUnit: selectedOptionOrg
    };

    console.log(params)

    /* ACA DEBE GUARDA LA INFO EN LA DB Y REDIRECCIONAR A LA PAGINA ANTERIOR */
  };

  return (
    <>
      {/* PUBLICATION DATA */}
      <div className='h4 mb-3'>Registro de nuevo financiamiento</div>

      {/* AUTHOR */}
      <CCard className='mb-3'>
        <CCardBody>
          <CCardSubtitle className="mb-3 text-body-secondary">Complete la siguiente informacion</CCardSubtitle>
          <CRow className="align-items-end">
            <CCol>
              <CFormSelect className='mb-3' aria-label="typeFundedAs" label="Nombre del financiamiento"
                          value={selectedOptionFundedAs} onChange={(e) => setSelectedOptionFundedAs(e.target.value)}>
                <option value="">Seleccione una opción</option>
                {FundedAs.map((option, indexFA) => (
                  <option  key={indexFA} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol>
              <CForm>
                <CFormInput className='mb-3' id="name"
                  type="input"
                  placeholder="Nombre o categoria"
                  value={fundingName} 
                  onChange={(e) => setFundingName(e.target.value)}
                />
              </CForm>
            </CCol>
          </CRow>
          

          <CFormSelect className='mb-3' aria-label="typeFunding" label="Tipo de financiamiento" 
                        value={selectedOptionFunding} onChange={(e) => setSelectedOptionFunding(e.target.value)}>
            <option value="">Seleccione una opción</option>
            {PFFunding.map((option, indexPFF) => (
              <option  key={indexPFF} value={option.value}>
                {option.label}
              </option>
            ))}
          </CFormSelect>

          <CFormSelect className='mb-3' aria-label="orgunit" label="Entidad financiadora" 
                        value={selectedOptionOrg} onChange={(e) => setSelectedOptionOrg(e.target.value)}>
            <option value="">Seleccione una opción</option>
            {FFOrg.map((option, indexFF) => (
              <option  key={indexFF} value={option.value}>
                {option.label}
              </option>
            ))}
          </CFormSelect>

          <CRow className="align-items-end">
            <CCol>
              <CFormSelect className='mb-3' aria-label="typeFunding" label="Monto otorgado" 
                            value={selectedOptionCurrency} onChange={(e) => setSelectedOptionCurrency(e.target.value)}>
                <option value="">Seleccione una opción</option>
                {Currency.map((option, indexC) => (
                  <option  key={indexC} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol>
              <CFormInput className='mb-3' id="amount"
                type="input"
                placeholder="Monto"
                value={fundingAmount} 
                onChange={handleFundingAmountChange}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      {/* FINISH REV */}       
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3 mb-4">
        <CButton color="primary" variant="outline" className="me-md-2" onClick={() =>navigate(-1)}>Cancelar</CButton>
        <CButton color="primary" onClick={handleFundingData}>Guardar</CButton>
      </div>

    </>
  )
}

export default NewFunding