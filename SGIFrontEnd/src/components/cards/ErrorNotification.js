import { CCard, CCardBody } from '@coreui/react'
import React from 'react'

const ErrorNotification = ({ message }) => {
  return (
    <CCard className='mt-1'>
      <CCardBody className='text-center'>
        Ha ocurrido un error, por favor intente nuevamente.
      </CCardBody>
    </CCard>
  )
}

export default ErrorNotification