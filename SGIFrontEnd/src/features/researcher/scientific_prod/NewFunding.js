import { CButton, CCard, CCardBody, CCardSubtitle, CCol, CForm, CFormInput, CFormSelect, CRow } from '@coreui/react'
import React from 'react'

const NewFunding = () => {
  return (
    <>
      {/* PUBLICATION DATA */}
      <div className='h4 mb-3'>Registro de nuevo financiamiento</div>

      {/* AUTHOR */}
      <CCard className='mb-3'>
        <CCardBody>
          <CCardSubtitle className="mb-3 text-body-secondary">Complete la siguiente informacion</CCardSubtitle>

          <CForm>
            <CFormInput className='mb-3' id="name"
              type="input"
              label="Nombre del financiamiento"
              placeholder="Nombre"
            />
          </CForm>

          <CFormSelect className='mb-3' label="Tipo de financiamiento" id="fundingType"
            options={[
              'Seleccione',
              { label: 'Fondos propios', value: '1' },
              { label: 'Otras modalidades de financiamiento', value: '2' },
            ]}
          />

          <CRow className="align-items-end">
            <CCol>
              <CFormSelect className='mb-3' label="Monto otorgado" id="currency"
                options={[
                  'Moneda',
                  { label: 'PEN - Sol (S/.)', value: '1' },
                  { label: 'USD - Dólar estadounidense ($)', value: '2' },
                  { label: 'EUR - Euro (€)', value: '3' },
                  { label: 'CAD - Dólar canadiense (C$)', value: '4' },
                  { label: 'CHF - Franco suizo (Fr)', value: '5' },
                  { label: 'GBP - Libra esterlina (£)', value: '6' }
                ]}
              />
            </CCol>
            <CCol>
              <CFormInput className='mb-3' id="amount"
                type="input"
                placeholder="Monto"
              />
            </CCol>
          </CRow>

          <CFormSelect className='mb-3' label="Entidad financiadora" id="fundingOrg"
            options={[
              'Seleccione',
              { label: 'Vicerrectorado de Investigación', value: '1' },
              { label: 'Externo', value: '2' },
            ]}
          />
        </CCardBody>
      </CCard>

      {/* FINISH REV */}       
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3 mb-4">
        <CButton color="primary" variant="outline" className="me-md-2">Cancelar</CButton>
        <CButton color="primary" href="#">Guardar</CButton>
      </div>

    </>
  )
}

export default NewFunding