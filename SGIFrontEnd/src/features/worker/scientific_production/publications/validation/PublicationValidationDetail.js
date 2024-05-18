import React from 'react'
import { dataSelectedPublication } from '../../../../../data_files/HardData'
import { useParams } from 'react-router-dom'
import InfoPublication from '../../../../../components/cards/InfoPublicationDetail'
import AccordionValidation from '../../../../../components/accordion/AccordionValidation'

 {/* CON LA API VA SIN [elementID - 1] */}

const PublicationValidationDetail = () => {
  const { elementID } = useParams() 

  return (
    <>
      <div className='h4'>{dataSelectedPublication[elementID - 1].title}</div>
      <InfoPublication data={dataSelectedPublication[elementID - 1]} validation={false}/>
      <AccordionValidation />
    </>
  )
}

export default PublicationValidationDetail