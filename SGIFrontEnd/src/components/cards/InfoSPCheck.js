import React, { useState } from 'react'
import { CCard, CCardBody, CCardText, CCol, CFormCheck, CRow } from '@coreui/react'

const InfoSPCheck = ({data, headers, onAction}) => {
  const [selectedSP, setSelectedSP] = useState([]);

  const handleSelection = (e) => {
    const { checked, value } = e.target;
    const newSelectedSP = checked ? [...selectedSP, value] : selectedSP.filter((group) => group !== value);

    setSelectedSP(newSelectedSP);
    onAction(newSelectedSP);
  }

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
        {Object.values(data).map((obj, indexR) => (
          <CCard key={indexR} className='mt-1'>
            <CCardBody>
              <CRow>
                {<CFormCheck id="checkboxNoLabel" value={obj.id} onChange={handleSelection} checked={selectedSP.includes(obj.id.toString())}/>}
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
                        (<CCardText>{obj[`${headerItems.value}`]}</CCardText>)
                      }
                    </CCol>
                  )
                })}
              </CRow>
            </CCardBody>
          </CCard>
        ))}
        
        {/* PAGINATION */}
        {/* MODIFICAR: DINAMICO CON LA CANTIDAD DE RESULTADOS */}
        {
          (data.length > 1) &&
          (
            <nav aria-label="Page navigation example" className='mt-2' >
              <ul className="pagination justify-content-end">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          )
        }
        </>
      )
    }
  </>
  )
}

export default InfoSPCheck