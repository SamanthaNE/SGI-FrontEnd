import React from 'react'
import { dataSelectedProject } from '../../../../data_files/HardData'
import { useParams } from 'react-router-dom'
import AccordionInfo from '../../../../components/accordion/AccordionInfo'
import InfoProjectDetail from '../../../../components/cards/InfoProjectDetail'

 {/* CON LA API VA SIN [elementID - 1] */}

const ProjectDetail = () => {
  const { elementID } = useParams() 

  return (
    <>
      <div className='h4'>{dataSelectedProject[elementID - 1].title}</div>
      <InfoProjectDetail data={dataSelectedProject[elementID - 1]} />
      <AccordionInfo title={'Financiamientos'} data={dataSelectedProject[elementID - 1].funding}/>
    </>
  )
}

export default ProjectDetail