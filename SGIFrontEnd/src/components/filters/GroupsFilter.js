import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardTitle, CCol, CRow, CFormSelect } from '@coreui/react'
import { Category, SPFGroup } from '../../data_files/FiltersData';

const GroupsFilter = () => {
  const [searchName, setSearchName] = useState('');
  const [selectedOptionCategory, setSelectedOptionCategory] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    console.log(searchTitle);
    console.log(selectedOptionCategory);

    const results = [];
    setSearchResults(results);
  };

  const handleClearFilter = () => {
    setSearchTitle('');
    setSelectedOptionCategory('');
  }

  return (
    <CCard className="mb-3">
      <CCardBody>
        <CCardTitle className="h6">Filtros de búsqueda</CCardTitle>
        <CRow className="mb-2">
          <CCol sm={8}>
            <input
              className="form-control"
              type="text"
              placeholder="Nombre del grupo"
              aria-label="name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </CCol>
          <CCol sm={4}>
            <CFormSelect aria-label="category" value={selectedOptionCategory} onChange={(e) => setSelectedOptionCategory(e.target.value)}>
              <option value="">Categoría</option>
              {Category.map((option) => (
                <option  key={option.value} value={option.label}>
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

export default GroupsFilter