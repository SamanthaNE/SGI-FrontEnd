import React, { useEffect, useState } from 'react'
import AccordionRules from '../../../../components/accordion/AccordionRules'
import { CButton, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { dataQualificationRules } from '../../../../data_files/HardData'
import { KEYCODE } from '../../../../config/Constants'
import axiosInstance from '../../../../config/HTTPService'
import LoadingSpinner from '../../../../components/spinner/LoadingSpinner'

const QualificationRules = () => {
  const [dataRulesAPI, setDataRulesAPI] = useState([]
);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          'keyCode': KEYCODE,
        };
        
        const response = await axiosInstance.get('api/evaluationrules/list', { params });
        setDataRulesAPI(response.data.result);
        console.log(response.data.result)
      } catch (error) {
        console.error('Error:', response.data.message);
      }
    }
  
    fetchData();
  }, [])

  return (
    <>
      <CRow className='h4 mb-3'>
        <CCol sm={10}>Reglas de calificación</CCol>
        <CCol className="d-grid gap-2 d-md-flex justify-content-md-end" sm={2}>
          <CButton color="primary" onClick={(e) => navigate("registro")}>
            <CIcon icon={cilPlus} /> Agregar
          </CButton>
        </CCol>
      </CRow>

      {dataRulesAPI ? 
        (
          dataRulesAPI.map((categoryItem, indexC) => {
            return (
              <AccordionRules key={indexC} title={categoryItem.categoryName} subcategory={categoryItem.subcategories} />
            )
          })
        )
        :
        (<LoadingSpinner />)
      }

      
    </>
  )
}

export default QualificationRules