import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardText, CCol, CRow } from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const InfoSP = ({data, headers, btnnav, detail, btnmore = "", pagesize = 10}) => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);

  const handleNavigationAction = (e) => {
    navigate(btnnav + `/${e.target.value}`)
  }

  const handleNavigationMore = () => {
    navigate(btnmore)
  }

  const totalPages = Math.ceil(data.length / pagesize);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const currentData = data.length > 1 ? (data.slice((currentPage - 1) * pagesize, currentPage * pagesize)) : (data) ;

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
        {currentData.length > 0 ?
          (
            currentData.map((obj, indexR) => (
              <CCard key={indexR} className='mt-1'>
                <CCardBody>
                  <CRow>
                    {headers.map((headerItems, indexH) => {
                      return (
                        <CCol key={indexH} className = {indexH == 0 ? ("col-4") : (null)}>
                          {headerItems.value === 'actions' ? 
                          (
                            <CButton color="primary" variant="ghost" value={obj.scopusPublicationId || obj.idOrgUnit || obj.idProject || obj.publicationId} onClick={handleNavigationAction}>
                              {detail === true ? "Ver detalle" : "--"}
                            </CButton>
                          )
                          :
                          (
                            headerItems.value === 'authorsList' ? 
                            (obj.authorsList.map((authorItems, indexA) => {
                              return (
                                <CCardText className='my-0' key={indexA}>{authorItems.authorName || authorItems.givenName + " " + authorItems.surname}</CCardText>
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
                          )
                          }
                        </CCol>
                      )
                    })}
                  </CRow>
                </CCardBody>
              </CCard>
            ))
          )
          :
          (
            <CCard className='mt-1'>
              <CCardBody>
                <CRow>
                  {headers.map((headerItems, indexH) => {
                    return (
                      <CCol key={indexH} className = {indexH == 0 ? ("col-4") : (null)}>
                        {headerItems.value === 'actions' ? 
                        (
                          <CButton color="primary" variant="ghost" value={currentData.id} onClick={handleNavigationAction}>
                            {detail === true ? "Ver detalle" : "--"}
                          </CButton>
                        )
                        :
                        (
                          headerItems.value === 'authorsList' ? 
                          (currentData.authorsList.map((authorItems, indexA) => {
                            return (
                              <CCardText className='my-0' key={indexA}>{authorItems.authorName}</CCardText>
                            )
                          }))
                          :
                          (<CCardText>{currentData[`${headerItems.value}`] ?? <i>Sin información</i>}</CCardText>)
                        )
                        }
                      </CCol>
                    )
                  })}
                </CRow>
              </CCardBody>
            </CCard>
          )
        }
        
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

        {btnmore && btnmore !== "empty" && (
          <div className="mt-3 d-grid gap-2 d-md-flex justify-content-md-center">
            <CButton color="primary" variant="outline" onClick={handleNavigationMore}>Ver más</CButton>
          </div>
        )}
        </>
      )
    }
  </>
  )
}

export default InfoSP
