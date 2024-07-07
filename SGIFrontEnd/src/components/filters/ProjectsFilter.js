import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardTitle, CCol, CRow, CFormSelect } from '@coreui/react'
import { PFFunding, PFStatus, SPFGroup } from '../../data_files/FiltersData';
import DateInput from '../dateInput/DateInput';

const ProjectsFilter = ({performance = false, onAction}) => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchOrgUnit, setSearchOrgUnit] = useState('');
  const [selectedOptionStatus, setSelectedOptionStatus] = useState('');
  const [selectedOptionFunding, setSelectedOptionFunding] = useState('');
  const [selectedOptionGroup, setSelectedOptionGroup] = useState('');

  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  
  const handleSearch = () => {
    const results = {
      'title': searchTitle === '' ? null : searchTitle,
      'status': selectedOptionStatus === '' ? null : selectedOptionStatus,
      'startDate': dateStart === '' ? null : dateStart,
      'endDate': dateEnd === '' ? null : dateEnd,
      'fundingType': selectedOptionFunding === '' ? null : selectedOptionFunding,
    };

    onAction(results);
  };

  const handleClearFilter = () => {
    setSearchTitle('');
    setSearchOrgUnit('');
    setSelectedOptionStatus('');
    setSelectedOptionFunding('');
    setSelectedOptionGroup('');
  }

  const handleDateStartChange = (newDate) => {
    setDateStart(newDate)
  };

  const handleDateEndChange = (newDate) => {
    setDateEnd(newDate)
  };

  return (
    <CCard className="mb-3">
      <CCardBody>
        <CCardTitle className="h6">Filtros de búsqueda</CCardTitle>
        <CRow className="mb-2">
        <CCol className={performance === true ? ("sm-4") : ("sm-6")}>
            <input
              className="form-control"
              type="text"
              placeholder="Título del proyecto"
              aria-label="title"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </CCol>
          {/*
          <CCol className={performance === true ? ("sm-4") : ("sm-6")}>
            <input
              className="form-control"
              type="text"
              placeholder="Unidad organizacional"
              aria-label="name"
              value={searchOrgUnit}
              onChange={(e) => setSearchOrgUnit(e.target.value)}
            />
          </CCol>
          
          {performance &&
          (
            <CCol className={"sm-4"}>
              <CFormSelect aria-label="group" value={selectedOptionGroup} onChange={(e) => setSelectedOptionGroup(e.target.value)}>
                <option value="">Grupo de investigación</option>
                {SPFGroup.map((option) => (
                  <option  key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          )
          }
          */}
        </CRow>
        <CRow className="mb-2">
          <CCol className="sm-3">
            <DateInput placeholder='Fecha de inicio (DD-MM-AAAA)' aria-label="startdate"
                        onChange={handleDateStartChange} value={dateStart}/>
          </CCol>
          <CCol className="sm-3">
            <DateInput placeholder='Fecha de fin (DD-MM-AAAA)' aria-label="enddate"
                        onChange={handleDateEndChange} value={dateEnd}/>
          </CCol>
          <CCol className="sm-3">
            <CFormSelect aria-label="status" value={selectedOptionStatus} onChange={(e) => setSelectedOptionStatus(e.target.value)}>
              <option value="">Estado</option>
              {PFStatus.map((option, index) => (
                <option  key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol className="sm-3">
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

export default ProjectsFilter