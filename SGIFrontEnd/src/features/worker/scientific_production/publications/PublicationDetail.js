import React from 'react'
import { dataProjectSearch, dataSelectedPublication } from '../../../../data_files/HardData'
import { useParams } from 'react-router-dom'
import AccordionInfo from '../../../../components/accordion/AccordionInfo'
import InfoPublication from '../../../../components/cards/InfoPublicationDetail'

 {/* CON LA API VA SIN [elementID - 1] */}

const PublicationDetail = () => {
  const { elementID } = useParams() 

  return (
    <>
      <div className='h4'>{dataSelectedPublication[elementID - 1].title}</div>
      <InfoPublication data={dataSelectedPublication[elementID - 1]}/>
      <AccordionInfo title={'Proyectos'} data={dataProjectSearch}/>
    </>
  )
}

export default PublicationDetail