import { CFormFeedback, CFormInput } from '@coreui/react';
import React, { useEffect, useState } from 'react'

const DateInput = ({label = '', placeholder = '', onChange}) => {
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters

    // Add dashes automatically
    if (value.length > 2) {
      value = `${value.slice(0, 2)}-${value.slice(2)}`;
    }
    if (value.length > 5) {
      value = `${value.slice(0, 5)}-${value.slice(5)}`;
    }

    // Limit the input to DD-MM-AAAA format
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    // Validate day and month
    const [day, month] = value.split('-');

    if (day && (parseInt(day) < 1 || parseInt(day) > 31)) {
      setError('El día debe estar entre 01 y 31');
    } else if (month && (parseInt(month) < 1 || parseInt(month) > 12)) {
      setError('El mes debe estar entre 01 y 12');
    } else {
      setError('');
    }

    setDate(value);
    onChange(value)
  };

  return (
    <>
      <CFormInput className='mb-3'
                  type="input"
                  id="date"
                  label={label}
                  placeholder={placeholder}
                  value={date}
                  onChange={handleDateChange}
                  invalid={!!error}
                />
      
      {error && <CFormFeedback invalid>{error}</CFormFeedback>}
    </>
  )
}

export default DateInput