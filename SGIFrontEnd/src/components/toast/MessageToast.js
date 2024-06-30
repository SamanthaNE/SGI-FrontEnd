import { CToast, CToastBody, CToastHeader, CToaster } from '@coreui/react'
import React from 'react'

const MessageToast = ({ header, body }) => {

  return (
    <CToaster className="p-3" placement="top-end">
      <CToast animation={false} autohide={false} visible={true}>
        <CToastHeader closeButton>
          <div className="fw-bold me-auto">{header}</div>
        </CToastHeader>
        <CToastBody>{body}</CToastBody>
      </CToast>
    </CToaster>
  )
}

export default MessageToast