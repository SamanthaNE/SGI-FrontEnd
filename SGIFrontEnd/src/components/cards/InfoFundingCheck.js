import React, { useState } from 'react'
import { CCard, CCardBody, CCardText, CCol, CFormCheck, CRow } from '@coreui/react'

const InfoFundingCheck = ({data, headers, onAction, pagesize = 5}) => {
  const [selectedSP, setSelectedSP] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelection = (selectedObj) => {
    const selectedId = selectedObj.idFunding;
    let newSelected;

    if (selectedSP.some(obj => obj.idFunding === selectedId)) {
      newSelected = selectedSP.filter(obj => obj.idFunding !== selectedId);
    } else {
      newSelected = [...selectedSP, selectedObj];
    }

    setSelectedSP(newSelected);
    onAction(newSelected);
  };

  const totalPages = Math.ceil(data.length / pagesize);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const currentData = data.slice((currentPage - 1) * pagesize, currentPage * pagesize);

  const renderPageNumbers = () => {
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > 3) {
      if (currentPage <= 2) {
        startPage = 1;
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(i)}>{i}</button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
  <>
    {
      <CRow className='px-3'>
        {<CFormCheck id="checkboxNoLabel" value="" disabled={true} />}
        {headers.map((headerItems, indexH) => {
          return (
          <CCol key={indexH} className = {indexH == 0 ? ("col-4") : (null)}>
            <div className='h6'>{headerItems.heading}</div>
          </CCol>
          )
        })}
      </CRow>
    }

    {
      data.length == 0 ? 
      (
        <CCard className='mt-1'>
          <CCardBody className='text-center'>
            No se cuenta con información registrada
          </CCardBody>
        </CCard>
      )
      :
      (
        <>
        {currentData.map((obj, indexR) => (
          <CCard key={indexR} className='mt-1'>
            <CCardBody>
              <CRow>
                {<CFormCheck id="checkboxNoLabel" onChange={() => handleSelection(obj)} checked={selectedSP.some(selectedObj => selectedObj.idFunding === obj.idFunding)}/>}
                {headers.map((headerItems, indexH) => {
                  return (
                    <CCol key={indexH} className = {indexH == 0 ? ("col-4") : (null)}>
                      {
                        headerItems.value == 'author' ? 
                        (obj.author.map((authorItems, indexA) => {
                          return (
                            <CCardText className='my-0' key={indexA}>{authorItems.name}</CCardText>
                          )
                        }))
                        :
                        headerItems.value === 'fundingType' && obj.relatedFundingList ? 
                        (obj.relatedFundingList.map((fundingItems, indexF) => {
                          return (
                            <CCardText className='my-0' key={indexF}>{fundingItems.fundingType}</CCardText>
                          )
                        }))
                        :
                        headerItems.value === 'amount' ? 
                        (obj.relatedFundingList ?
                          obj.relatedFundingList.map((fundingItems, indexF) => {
                            return (
                              <CCardText className='my-0' key={indexF}>{fundingItems.currCode + " " + fundingItems.amount}</CCardText>
                            )
                          })
                          :
                          (<CCardText className='my-0'>{obj.currCode + " " + obj.amount}</CCardText>)
                        )
                        :
                        obj[`${headerItems.value}`] === "" ?
                        (<CCardText>{<i>Sin {headerItems.heading}</i>}</CCardText>)
                        :
                        (<CCardText>{obj[`${headerItems.value}`] ?? <i>Sin información</i>}</CCardText>)
                      }
                    </CCol>
                  )
                })}
              </CRow>
            </CCardBody>
          </CCard>
        ))}
        
        {/* PAGINATION */}
        {(data.length > pagesize) && 
        (
          <nav aria-label="pageNav" className='mt-2'>
            <ul className="pagination justify-content-end">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {renderPageNumbers()}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        )}
        </>
      )
    }
  </>
  )
}

export default InfoFundingCheck