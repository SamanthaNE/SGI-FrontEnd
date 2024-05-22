import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardTitle, CCol, CRow, CFormSelect } from '@coreui/react'
import { PFResourceType, SPFGroup, SPFTypeD, SPFTypeS } from '../../data_files/FiltersData';

const PublicationFilter = ({data, performance = false}) => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchJournalName, setSearchJournalName] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [selectedResourceType, setSelectedResourceType] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [selectedOptionGroup, setSelectedOptionGroup] = useState('');

  const [searchResults, setSearchResults] = useState([]);
/*
  const handleChangeTitle = (e) =>
  {
      const searchTerm = e.target.value;
      const filtered = data.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setSearchTitle(filtered);
      console.log(searchTitle);
  };
*/
  const handleSearch = () => {
    console.log(searchTitle);
    console.log(searchJournalName);
    console.log(searchAuthor);
    console.log(selectedResourceType);
    console.log(searchYear);

    const results = [];
    setSearchResults(results);
  };

  const handleClearFilter = () => {
    setSearchTitle('');
    setSearchJournalName('');
    setSearchAuthor('');
    setSelectedResourceType('');
    setSearchYear('');
    setSelectedOptionGroup('');
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
              placeholder="Título de la publicación"
              aria-label="title"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </CCol>
          <CCol className="sm-4">
            <input
              className="form-control"
              type="text"
              placeholder="Nombre de la revista"
              aria-label="name"
              value={searchJournalName}
              onChange={(e) => setSearchJournalName(e.target.value)}
            />
          </CCol>
          <CCol className="sm-4">
            <input
              className="form-control"
              type="text"
              placeholder="Apellido del autor"
              aria-label="autor"
              value={searchAuthor}
              onChange={(e) => setSearchAuthor(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-2">
            <CCol className={"sm-3"}>
              <CFormSelect aria-label="group" value={selectedOptionGroup} onChange={(e) => setSelectedOptionGroup(e.target.value)}>
                <option value="">Grupo de investigación</option>
                {SPFGroup.map((option) => (
                  <option  key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          <CCol className={performance === true ? ("sm-3") : ("sm-4")}>
            <CFormSelect aria-label="typeS" value={selectedResourceType} onChange={(e) => setSelectedResourceType(e.target.value)}>
              <option value="">Tipo de recurso</option>
              {PFResourceType.map((option) => (
                <option  key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol className={performance === true ? ("sm-3") : ("sm-4")}>
            <input
              className="form-control"
              type="text"
              placeholder="Año (YYYY)"
              aria-label="year"
              maxLength="4"
              value={searchYear}
              onChange={(e) => setSearchYear(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
            />
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

export default PublicationFilter
