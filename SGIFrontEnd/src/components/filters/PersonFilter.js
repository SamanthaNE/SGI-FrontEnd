import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/HTTPService';
import { CButton, CCard, CCardBody, CCol, CFormCheck, CFormInput, CRow } from '@coreui/react';
import { KEYCODE } from '../../config/Constants';
import LoadingSpinner from '../spinner/LoadingSpinner';

const PersonFilter = ({ onAction }) => {
  const [query, setQuery] = useState('');
  const [resultsAPI, setResultsAPI] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSearch = async () => {
    const params = {
      'keyCode': KEYCODE,
      'personData': query
    };
    
    try {
      const response = await axiosInstance.get('api/search/person', { params });
      setResultsAPI(response.data.resultList);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((i) => i !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  useEffect(() => {
    if(selectedItems){
      onAction(selectedItems);
    }
  }, [selectedItems, onAction])
  

  return (
    <>
      <CRow className="align-items-end my-3">
        <CCol sm={10}>
          <CFormInput type="text" id="teamSearch" placeholder="Nombre del investigador" 
                      value={query} onChange={(e) => setQuery(e.target.value)}/>
        </CCol>
        <CCol className="d-grid gap-2 d-md-flex justify-content-md-end" sm={2}>
          <CButton color="primary" onClick={handleSearch}>Buscar</CButton>
        </CCol>
      </CRow>
      {
        resultsAPI ?
        (
          resultsAPI.map((item, index) => (
            <CRow key={index} className='mx-2 mt-2'>
              <CFormCheck id="checkboxNoLabel" onChange={() => handleSelectItem(item)} 
                          checked={selectedItems.includes(item)}/>
              {item.firstNames} {item.familyNames}
            </CRow>
          ))
        )
        :
        (
          <LoadingSpinner />
        )
      }
    </>
  );
}

export default PersonFilter