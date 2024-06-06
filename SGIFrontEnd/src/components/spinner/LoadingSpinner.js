import { CSpinner } from '@coreui/react'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <CSpinner size="sm" variant="grow" style={{ width: '3rem', height: '3rem'}}/>
    </div>
  )
}

export default LoadingSpinner