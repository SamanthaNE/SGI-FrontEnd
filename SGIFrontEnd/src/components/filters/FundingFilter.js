import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardTitle, CCol, CRow, CFormSelect } from '@coreui/react'
import { FFOrg, PFFunding } from '../../data_files/FiltersData';

const FundingFilter = ({ onAction }) => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchIdentifier, setSearchIdentifier] = useState('');
  const [selectedOptionOrg, setSelectedOptionOrg] = useState('');
  const [selectedOptionFunding, setSelectedOptionFunding] = useState('');

  const handleSearch = () => {
    const results = {
      'title': searchTitle === '' ? null : searchTitle,
      'identifier': searchIdentifier === '' ? null : searchIdentifier,
      'orgUnit': selectedOptionOrg === '' ? null : selectedOptionOrg,
      'fundingType': selectedOptionFunding === '' ? null : selectedOptionFunding
    };

    onAction(results);
  };

  const handleClearFilter = () => {
    setSearchTitle('');
    setSearchIdentifier('');
    setSelectedOptionOrg('');
    setSelectedOptionFunding('');
  }

  return (
    <CCard className="mb-3">
      <CCardBody>
        <CCardTitle className="h6">Filtros de búsqueda</CCardTitle>
        <CRow className="mb-2">
          <CCol className="sm-4">
            <input
              className="form-control"
              type="text"
              placeholder="Nombre del financiamiento"
              aria-label="title"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </CCol>
          <CCol className="sm-4">
            <input
              className="form-control"
              type="text"
              placeholder="Identificador"
              aria-label="identifier"
              value={searchIdentifier}
              onChange={(e) => setSearchIdentifier(e.target.value)}
            />
          </CCol>
          <CCol className="sm-4">
            <CFormSelect aria-label="orgunit" value={selectedOptionOrg} onChange={(e) => setSelectedOptionOrg(e.target.value)}>
              <option value="">Entidad financiadora</option>
              {FFOrg.map((option, index) => (
                <option  key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol className="sm-4">
            <CFormSelect aria-label="typeFunding" value={selectedOptionFunding} onChange={(e) => setSelectedOptionFunding(e.target.value)}>
              <option value="">Tipo de financiamiento</option>
              {PFFunding.map((option, index) => (
                <option  key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
        
        {/* BUTTONS */}
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <CButton color="primary" variant="outline" className="me-md-2" onClick={handleClearFilter}>Limpiar</CButton>
          <CButton color="primary" onClick={handleSearch}>Buscar</CButton>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default FundingFilter